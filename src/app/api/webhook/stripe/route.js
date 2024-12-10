import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "@/lib/connectDB";
import User from "@/models/User";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  await connectMongo();

  const body = await req.text();

  const signature = await headers().get("stripe-signature");

  let data;
  let eventType;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        let user;
        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ["line_items"],
          }
        );
        const customerId = session?.customer;
        const customer = await stripe.customers.retrieve(customerId);
        const priceId = session?.line_items?.data[0]?.price.id;

        if (customer.email) {
          user = await User.findOne({ email: customer.email });

          if (!user) {
            user = new User({
              email: customer.email,
              fullName: customer.name,
              customerId,
            });

            await user.save();
          }
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        user.priceId = priceId;
        user.hasAccess = true;
        user.customerId = customerId;
        await user.save();

        try {
          await resend.emails.send({
            from: "Pixel Track <pixeltrack@builderbee.pro>",
            to: user.email,
            subject: "Welcome to Pixel Track!",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
              <h1 style="color: #8b5cf6; text-align: center;">Welcome to Pixel Track!</h1>
              <p style="font-size: 16px; color: #333;">Hello ${user.email},</p>
              <p style="font-size: 16px; color: #333;">Thank you for buying PixelTrack. If you didn't have an account before, login with google or passwordless with the email you used to buy the product.</p>
      
              <p style="font-size: 14px; color: #888; text-align: center; margin-top: 20px;">
                &copy; ${new Date().getFullYear()} Pixel Track. All rights reserved.
              </p>
            </div>
          `,
          });
          console.log(`Email successfully sent to ${user.email}`);
        } catch (error) {
          console.error(
            `Failed to send email to ${user.email}: ${error.message}`
          );
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          data.object.id
        );
        const user = await User.findOne({
          customerId: subscription.customer,
        });

        if (user) {
          user.hasAccess = false;
          await user.save();
        }

        break;
      }

      default:
        console.warn(`Unhandled event type: ${eventType}`);
    }
  } catch (e) {
    console.error("stripe error: " + e.message + " | EVENT TYPE: " + eventType);
  }

  return NextResponse.json({});
}
