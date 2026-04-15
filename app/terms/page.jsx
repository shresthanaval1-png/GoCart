export default function Terms() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-slate-700">

      <h1 className="text-3xl font-semibold mb-6">Terms & Conditions</h1>

      <p className="mb-6 text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        Welcome to GoCart. By accessing and using our website, you agree to comply with the following terms and conditions.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-3">1. Use of Website</h2>
      <p>
        You agree to use this website only for lawful purposes and in a way that does not harm the platform or other users.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-3">2. Account Responsibility</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account and password.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-3">3. Products & Pricing</h2>
      <p>
        All products listed are subject to availability and pricing may change without notice.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-3">4. Payments</h2>
      <p>
        Payments are processed securely through third-party providers (Stripe test mode).
      </p>

      <h2 className="text-xl font-medium mt-8 mb-3">5. Limitation of Liability</h2>
      <p>
        GoCart is not responsible for any indirect damages resulting from the use of the platform.
      </p>

      <h2 className="text-xl font-medium mt-8 mb-3">6. Changes to Terms</h2>
      <p>
        We may update these terms at any time. Continued use of the site means you accept the changes.
      </p>

    </div>
  );
}