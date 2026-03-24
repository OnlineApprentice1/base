import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-base-content/50 mb-10">
        Last updated: March 2026
      </p>

      <div className="space-y-8 font-[family-name:var(--font-body)]">
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Introduction
          </h2>
          <p className="text-base-content/80">
            {{BUSINESS_NAME}} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            is committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your personal information
            when you visit our website or use our services, in accordance with the
            Personal Information Protection and Electronic Documents Act (PIPEDA)
            and applicable provincial privacy legislation.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Information We Collect
          </h2>
          <p className="text-base-content/80 mb-3">
            We may collect personal information that you voluntarily provide to us,
            including:
          </p>
          <ul className="list-disc list-inside text-base-content/80 space-y-1.5 ml-2">
            <li>Name, email address, and phone number (via our contact form)</li>
            <li>Address or service location (when requesting a quote or booking)</li>
            <li>Any additional details you include in your message to us</li>
          </ul>
          <p className="text-base-content/80 mt-3">
            We also automatically collect certain technical information when you
            visit our website, including your IP address, browser type, operating
            system, and pages visited. This information is collected through
            cookies and similar technologies.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-base-content/80 space-y-1.5 ml-2">
            <li>To respond to your enquiries and provide requested services</li>
            <li>To send you quotes, invoices, and service-related communications</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p className="text-base-content/80 mt-3">
            We do not sell, rent, or trade your personal information to third
            parties for marketing purposes.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Cookies
          </h2>
          <p className="text-base-content/80">
            Our website may use cookies and similar tracking technologies to
            enhance your browsing experience and analyse website traffic. You can
            control cookie settings through your browser preferences. Disabling
            cookies may limit certain features of our website.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Data Security
          </h2>
          <p className="text-base-content/80">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the Internet or electronic storage is 100% secure.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Your Rights
          </h2>
          <p className="text-base-content/80">
            Under PIPEDA, you have the right to access, correct, or request
            deletion of your personal information held by us. To exercise these
            rights, please contact us using the information below. We will respond
            to your request within 30 days.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Changes to This Policy
          </h2>
          <p className="text-base-content/80">
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated revision date. We encourage you
            to review this policy periodically.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Contact
          </h2>
          <p className="text-base-content/80">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <ul className="list-none text-base-content/80 mt-3 space-y-1.5">
            <li>
              <strong>{{BUSINESS_NAME}}</strong>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
