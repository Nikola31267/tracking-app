"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
  const router = useRouter();
  return (
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
                Welcome to Pixel Track (&quot;Company,&quot; &quot;we,&quot;
                &quot;our,&quot; or &quot;us&quot;) . These Terms of Service
                govern your access to and use of our website traffic tracking
                API (&quot;API&quot;) and related services (collectively, the
                &quot;Service&quot;). By accessing or using the Service, you
                agree to be bound by these Terms. If you do not agree to these
                Terms, do not access or use the Service.
              </p>

              <br />
              <hr />

              <h2>1. Definitions</h2>
              <ul>
                <li>
                  <strong>1.1</strong> &quot;API Key&quot; means a unique code
                  provided by us to you for accessing the API.
                </li>
                <li>
                  <strong>1.2</strong> &quot;User,&quot; &quot;you,&quot; or
                  &quot;your&quot; refers to the individual or entity using the
                  Service.
                </li>
                <li>
                  <strong>1.3</strong> &quot;Data&quot; means any information
                  collected, processed, or transmitted through the Service.
                </li>
              </ul>
              <br />
              <hr />

              <h2>2. Access and Use of the Service</h2>
              <p>
                <strong>2.1 License:</strong> Subject to these Terms, we grant
                you a non-exclusive, non-transferable, revocable license to
                access and use the API for your lawful business purposes.
              </p>

              <p>
                <strong>2.2 Restrictions:</strong> You agree not to:
              </p>
              <ul>
                <li>
                  Use the API for unlawful purposes or to violate any applicable
                  laws or regulations.
                </li>
                <li>Reverse engineer, decompile, or disassemble the API.</li>
                <li>
                  Share, sublicense, or resell your API Key to any third party.
                </li>
                <li>
                  Send malicious code, spam, or other harmful content through
                  the Service.
                </li>
              </ul>

              <p>
                <strong>2.3 Account Responsibility:</strong> You are responsible
                for maintaining the confidentiality of your API Key and any
                activities that occur under your account. Notify us immediately
                of any unauthorized access or use.
              </p>
              <br />
              <hr />

              <h2>3. Data Usage and Privacy</h2>
              <p>
                <strong>3.1 Ownership:</strong> You retain ownership of the data
                you send to or retrieve from the Service. However, you grant us
                a license to use, store, and process the data to provide and
                improve the Service.
              </p>

              <p>
                <strong>3.2 Compliance:</strong> You represent and warrant that
                you have all necessary rights and consents to submit data to the
                Service.
              </p>

              <p>
                <strong>3.3 Privacy:</strong> Your use of the Service is subject
                to our Privacy Policy, which is incorporated by reference into
                these Terms.
              </p>
              <br />
              <hr />

              <h2>4. Fees and Payment</h2>
              <p>
                <strong>4.1 Pricing:</strong> Use of the API may be subject to
                fees as outlined in our pricing documentation.
              </p>

              <p>
                <strong>4.2 Payment Terms:</strong> Payments are due as
                specified in your subscription plan. Failure to pay may result
                in suspension or termination of your access to the Service.
              </p>

              <p>
                <strong>4.3 Taxes:</strong> You are responsible for all
                applicable taxes, excluding taxes based on our income.
              </p>
              <br />
              <hr />

              <h2>5. Intellectual Property</h2>
              <p>
                <strong>5.1 Ownership:</strong> All rights, title, and interest
                in and to the API and Service, including any updates or
                improvements, remain with us and our licensors.
              </p>

              <p>
                <strong>5.2 Feedback:</strong> If you provide feedback or
                suggestions, you grant us the right to use such feedback without
                restriction or compensation.
              </p>
              <br />
              <hr />

              <h2>6. Termination</h2>
              <p>
                <strong>6.1 By You:</strong> You may terminate your use of the
                Service at any time by ceasing all use of the API and notifying
                us.
              </p>

              <p>
                <strong>6.2 By Us:</strong> We may suspend or terminate your
                access to the Service if you violate these Terms, fail to pay
                applicable fees, or if we discontinue the Service.
              </p>

              <p>
                <strong>6.3 Effect of Termination:</strong> Upon termination,
                your access to the Service and use of the API will cease, and
                any outstanding fees will remain due.
              </p>
              <br />
              <hr />

              <h2>7. Warranties and Disclaimers</h2>
              <p>
                <strong>7.1 No Warranty:</strong> The Service is provided
                &quot;as is&quot; and &quot;as available&quot; without
                warranties of any kind, express or implied, including but not
                limited to merchantability, fitness for a particular purpose, or
                non-infringement.
              </p>

              <p>
                <strong>7.2 Limitation of Liability:</strong> To the maximum
                extent permitted by law, we will not be liable for any indirect,
                incidental, consequential, or special damages, including loss of
                profits, data, or business opportunities, arising from your use
                of the Service.
              </p>
              <br />
              <hr />

              <h2>8. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless the Company
                and its affiliates from and against any claims, damages,
                liabilities, costs, and expenses arising from your use of the
                Service, violation of these Terms, or infringement of any
                third-party rights.
              </p>
              <br />
              <hr />

              <h2>9. Changes to the Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. If
                changes are made, we will provide notice by updating the
                &quot;Effective Date&quot; and, where appropriate, notifying you
                through other means. Your continued use of the Service
                constitutes acceptance of the revised Terms.
              </p>
              <br />
              <hr />

              <h2>10. Governing Law and Dispute Resolution</h2>
              <p>
                <strong>10.1 Governing Law:</strong> These Terms are governed by
                the laws of [Your Jurisdiction], without regard to conflict of
                laws principles.
              </p>

              <p>
                <strong>10.2 Dispute Resolution:</strong> Any disputes will be
                resolved exclusively through binding arbitration in [Your
                Location], except that either party may seek injunctive relief
                in a court of competent jurisdiction.
              </p>
              <br />
              <hr />

              <h2>11. Miscellaneous</h2>
              <p>
                <strong>11.1 Entire Agreement:</strong> These Terms, along with
                our Privacy Policy, constitute the entire agreement between you
                and us regarding the Service.
              </p>

              <p>
                <strong>11.2 Severability:</strong> If any provision of these
                Terms is found to be invalid or unenforceable, the remaining
                provisions will remain in full force and effect.
              </p>

              <p>
                <strong>11.3 No Waiver:</strong> Our failure to enforce any
                right or provision under these Terms does not constitute a
                waiver of such right or provision.
              </p>
              <br />
              <hr />

              <h2>Contact Us</h2>
              <p>
                For questions or concerns about these Terms, contact us at:
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
  );
};

export default TermsOfService;
