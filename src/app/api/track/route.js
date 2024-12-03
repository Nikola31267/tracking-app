import Visit from "../models/Visit.js";
import UAParser from "ua-parser-js";
import { Resend } from "resend";
import dotenv from "dotenv";
import geoip from "geoip-lite";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/connectDB.js";

dotenv.config();

const resend = new Resend("re_6fanxK3h_DnbSG3RKNTJoBufYWEqVkctD");

export async function POST(req) {
  await connectToDatabase();
  try {
    const { headers, body } = req;
    const { apiKey, page } = body;
    const parser = new UAParser();
    const agent = parser.setUA(headers["user-agent"]).getResult();

    const geo = geoip.lookup(
      req.headers["x-forwarded-for"] || req.connection.remoteAddress
    );
    const country = geo ? geo.country : "Unknown";

    const visitData = {
      ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      device: agent.device.type || "Unknown",
      browser: agent.browser.name || "Unknown",
      platform: agent.os.name || "Unknown",
      page: page || "Unknown",
      referrer: req.headers.referer || "Direct",
      country: country,
    };

    const visitDocument = await Visit.findOne({ key: apiKey }).populate(
      "creator",
      "email"
    );

    if (!visitDocument) {
      return NextResponse.json({ error: "Wrong apiKey" }, { status: 400 });
    }

    visitDocument.visit.push(visitData);
    await visitDocument.save();

    if (visitDocument.visit.length === parseInt(visitDocument.goal, 10)) {
      const creatorEmail = visitDocument.creator.email;

      if (!creatorEmail) {
        console.error("Creator email not found");
        return;
      }

      (async function () {
        const { data, error } = await resend.emails.send({
          from: "PixelTrack <pixeltrack@builderbee.pro>",
          to: [creatorEmail],
          subject: "Goal reached",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
              <h1 style="color: #1a73e8; text-align: center;">Hello!</h1>
              <p style="font-size: 16px; color: #333;">Congratulations! Your goal of ${
                visitDocument.goal
              } visits has been reached.</p>
              
              <p style="font-size: 14px; color: #888; text-align: center; margin-top: 20px;">
                &copy; ${new Date().getFullYear()} PixelTrack. All rights reserved.
              </p>
            </div>
          `,
        });

        if (error) {
          return console.error({ error });
        }

        console.log({ data });
      })();
    }

    return NextResponse.json(
      { message: "Visit logged successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error logging visit:", error);
    return NextResponse.json({ error: "Error logging visit" }, { status: 500 });
  }
}
