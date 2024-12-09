import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "@/lib/connectDB";
import User from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  await connectMongo();

  const body = await req.text();

  // Await the headers() function to ensure it resolves before accessing its value
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
        await user.save();

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
