export default function Terms() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-slate-700">

      <h1 className="text-3xl font-semibold mb-4">Terms & Conditions</h1>

      <p className="mb-8 text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6 leading-relaxed">
        Welcome to GoCart. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our platform.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-2">1. Use of Website</h2>
      <p className="leading-relaxed">
        You agree to use this website only for lawful purposes and in a way that does not harm, disrupt, or impair the functionality of the platform or its users.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-2">2. Account Responsibility</h2>
      <p className="leading-relaxed">
        You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-2">3. Products & Pricing</h2>
      <p className="leading-relaxed">
        All products listed on GoCart are subject to availability. Prices may change at any time without prior notice.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-2">4. Payments</h2>
      <p className="leading-relaxed">
        Payments are processed securely through third-party providers (Stripe – test mode for demonstration purposes). We do not store your payment information.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-2">5. Limitation of Liability</h2>
      <p className="leading-relaxed">
        GoCart shall not be held liable for any indirect, incidental, or consequential damages arising from the use of the platform.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-2">6. Changes to Terms</h2>
      <p className="leading-relaxed">
        We reserve the right to update or modify these terms at any time. Continued use of the website implies acceptance of the updated terms.
      </p>

    </div>
  );
}