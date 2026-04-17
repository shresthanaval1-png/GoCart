'use client'
import Breadcrumb from "@/components/Breadcrumb";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Terms() {

  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-slate-700">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="mb-3 p-2 rounded-full hover:bg-slate-100 transition text-slate-500 hover:text-green-600"
      >
        <MoveLeftIcon size={20} />
      </button>

      {/* 🍞 BREADCRUMB */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Terms", href: "/terms" }
        ]}
      />

      {/* 🧾 TITLE */}
      <h1 className="text-3xl font-semibold mt-2 mb-6 text-slate-800">
        Terms & Conditions
      </h1>

      <p className="mb-6 text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      {/* INTRO */}
      <p className="mb-6 leading-relaxed">
        Welcome to GoCart. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our platform.
      </p>

      {/* SECTION 1 */}
      <h2 className="text-xl font-medium mt-8 mb-3">1. Use of Website</h2>
      <p className="leading-relaxed">
        You agree to use this website only for lawful purposes and in a way that does not harm, disrupt, or impair the functionality of the platform or its users.
      </p>

      {/* SECTION 2 */}
      <h2 className="text-xl font-medium mt-8 mb-3">2. Account Responsibility</h2>
      <p className="leading-relaxed">
        You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility.
      </p>

      {/* SECTION 3 */}
      <h2 className="text-xl font-medium mt-8 mb-3">3. Products & Pricing</h2>
      <p className="leading-relaxed">
        All products listed on GoCart are subject to availability. Prices may change at any time without prior notice.
      </p>

      {/* SECTION 4 */}
      <h2 className="text-xl font-medium mt-8 mb-3">4. Payments</h2>
      <p className="leading-relaxed">
        Payments are processed securely through third-party providers (Stripe – test mode for demonstration purposes). We do not store your payment information.
      </p>

      {/* SECTION 5 */}
      <h2 className="text-xl font-medium mt-8 mb-3">5. Limitation of Liability</h2>
      <p className="leading-relaxed">
        GoCart shall not be held liable for any indirect, incidental, or consequential damages arising from the use of the platform.
      </p>

      {/* SECTION 6 */}
      <h2 className="text-xl font-medium mt-8 mb-3">6. Changes to Terms</h2>
      <p className="leading-relaxed">
        We reserve the right to update or modify these terms at any time. Continued use of the website implies acceptance of the updated terms.
      </p>

    </div>
  );
}