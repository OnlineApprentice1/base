import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-base-content/50 mb-10">
        Last updated: March 2026
      </p>

      <div className="space-y-8 font-[family-name:var(--font-body)]">
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Acceptance of Terms
          </h2>
          <p className="text-base-content/80">
            By accessing our website or using the services provided by
            {{BUSINESS_NAME}}, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
            We reserve the right to update or modify these terms at any time,
            and your continued use of our services constitutes acceptance of any
            changes.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Services
          </h2>
          <p className="text-base-content/80">
            {{BUSINESS_NAME}} provides services as described on our website. All
            services are subject to availability and may vary based on location,
            season, and project scope. We reserve the right to refuse service to
            anyone at our discretion.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Quotes and Pricing
          </h2>
          <p className="text-base-content/80">
            All quotes provided are estimates and may be subject to change based
            on the actual scope of work, materials required, and site conditions
            discovered during the project. Final pricing will be confirmed in a
            written agreement before work begins. Quotes are valid for 30 days
            from the date of issue unless otherwise specified.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Payment Terms
          </h2>
          <p className="text-base-content/80">
            Payment terms will be outlined in your service agreement. A deposit
            may be required before work begins. The remaining balance is due upon
            completion of the agreed-upon work unless other arrangements have
            been made in writing. Late payments may be subject to interest charges
            as permitted by Ontario law.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Cancellation Policy
          </h2>
          <p className="text-base-content/80">
            If you need to cancel a scheduled service, please provide at least
            48 hours&apos; notice. Cancellations made with less than 48 hours&apos;
            notice may be subject to a cancellation fee. Deposits may be
            non-refundable depending on the work already completed or materials
            already purchased.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Limitation of Liability
          </h2>
          <p className="text-base-content/80">
            To the fullest extent permitted by law, {{BUSINESS_NAME}} shall not
            be liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of our services. Our total
            liability for any claim shall not exceed the total amount paid for
            the specific service in question.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Governing Law
          </h2>
          <p className="text-base-content/80">
            These Terms of Service are governed by and construed in accordance
            with the laws of the Province of Ontario and the federal laws of
            Canada applicable therein. Any dispute arising from these terms
            shall be subject to the exclusive jurisdiction of the courts of
            the Province of Ontario.
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-4">
            Contact
          </h2>
          <p className="text-base-content/80">
            If you have any questions about these Terms of Service, please
            contact us:
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
