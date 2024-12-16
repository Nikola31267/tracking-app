"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Head from "next/head";

const TermsOfService = () => {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full px-4 md:px-6 lg:px-8">
          <div className="flex items-start gap-2 flex-col mt-20">
            <Button
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-gray-100 shadow-md hover:bg-gray-100 text-black px-5 py-6 "
            >
              <ArrowLeft />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-center">
              Terms of Service for Pixel Track
            </h1>
            <div className="prose prose-xl prose-invert max-w-none mt-8 text-start mb-10">
              <div>
                <p>
                  <strong>Effective Date:</strong> 16.12.2024
                </p>

                <p>
                  Pixel Track (&quot;Company,&quot; &quot;we,&quot;
                  &quot;our,&quot; or &quot;us&quot;) is committed to protecting
                  your privacy. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you use our
                  website traffic tracking API (&quot;API&quot;) and related
                  services (collectively, the &quot;Service&quot;). By accessing
                  or using the Service, you agree to the terms of this Privacy
                  Policy.
                </p>

                <hr />
                <br />
                <h2>1. Information We Collect</h2>
                <p>
                  We may collect the following types of information when you use
                  the Service:
                </p>
                <ul>
                  <li>
                    <strong>1.1 Personal Information:</strong> Information that
                    identifies you as an individual, such as your name, email
                    address, and payment details when you register for the
                    Service.
                  </li>
                  <li>
                    <strong>1.2 Usage Data:</strong> Information about how you
                    interact with the API, including request logs, timestamps,
                    and usage metrics.
                  </li>
                  <li>
                    <strong>1.3 Device Information:</strong> Information about
                    the device and software you use to access the API, such as
                    IP address, browser type, and operating system.
                  </li>
                </ul>

                <hr />
                <br />
                <h2>2. How We Use Your Information</h2>
                <p>
                  We use the information we collect for the following purposes:
                </p>
                <ul>
                  <li>To provide, operate, and maintain the Service.</li>
                  <li>To process your payments and manage your account.</li>
                  <li>To improve, personalize, and enhance the Service.</li>
                  <li>
                    To communicate with you, including responding to inquiries
                    and sending updates.
                  </li>
                  <li>
                    To monitor and analyze usage trends and ensure the security
                    of the Service.
                  </li>
                  <li>
                    To comply with legal obligations and enforce our Terms of
                    Service.
                  </li>
                </ul>

                <hr />
                <br />
                <h2>3. Information Sharing and Disclosure</h2>
                <p>
                  We may share your information in the following circumstances:
                </p>
                <ul>
                  <li>
                    <strong>3.1 Service Providers:</strong> We may share your
                    information with third-party service providers who perform
                    services on our behalf, such as payment processing, data
                    analysis, and customer support.
                  </li>
                  <li>
                    <strong>3.2 Legal Compliance:</strong> We may disclose your
                    information if required to do so by law or in response to
                    valid legal requests.
                  </li>
                  <li>
                    <strong>3.3 Business Transfers:</strong> In the event of a
                    merger, acquisition, or sale of assets, your information may
                    be transferred to the acquiring entity.
                  </li>
                </ul>

                <hr />
                <br />
                <h2>4. Data Retention</h2>
                <p>
                  We retain your information only as long as necessary to
                  provide the Service and fulfill the purposes outlined in this
                  Privacy Policy. We may also retain certain information to
                  comply with legal obligations, resolve disputes, and enforce
                  our agreements.
                </p>

                <hr />
                <br />
                <h2>5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your information from unauthorized access, loss,
                  misuse, or alteration. However, no method of transmission over
                  the internet or electronic storage is completely secure, and
                  we cannot guarantee absolute security.
                </p>

                <hr />
                <br />
                <h2>6. Your Privacy Rights</h2>
                <p>
                  You may have the following rights under applicable privacy
                  laws:
                </p>
                <ul>
                  <li>Access, update, or delete your personal information.</li>
                  <li>
                    Object to or restrict the processing of your personal
                    information.
                  </li>
                  <li>
                    Withdraw consent where processing is based on your consent.
                  </li>
                  <li>
                    File a complaint with a regulatory authority regarding our
                    data practices.
                  </li>
                </ul>

                <p>
                  To exercise these rights, please contact us at{" "}
                  <a
                    className="underline"
                    href="mailto:contact-pixeltrack@builderbee.pro"
                  >
                    contact-pixeltrack@builderbee.pro
                  </a>
                  .
                </p>
                <br />
                <hr />

                <h2>7. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or for other operational, legal, or
                  regulatory reasons. We will provide notice of any significant
                  changes by updating the &quot;Effective Date&quot; and, where
                  appropriate, notifying you through other means.
                </p>
                <br />
                <hr />

                <h2>8. Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:
                  <br />
                  <a
                    className="underline"
                    href="mailto:contact-pixeltrack@builderbee.pro"
                  >
                    contact-pixeltrack@builderbee.pro
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
