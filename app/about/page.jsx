'use client'
import Breadcrumb from "@/components/Breadcrumb"
import { MoveLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function About() {

  const router = useRouter()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-slate-700">

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
          { label: "About", href: "/about" }
        ]}
      />

      {/* 🧾 TITLE */}
      <h1 className="text-3xl font-semibold mt-2 mb-6 text-slate-800">
        About GoCart
      </h1>

      {/* INTRO */}
      <p className="mb-6 text-lg">
        Welcome to <span className="font-semibold text-slate-900">GoCart</span> — your smart destination for the latest gadgets and everyday essentials.
      </p>

      <p className="mb-6">
        We aim to make online shopping simple, fast, and reliable. From electronics to lifestyle products, GoCart connects buyers with trusted sellers in one seamless platform.
      </p>

      {/* MISSION */}
      <h2 className="text-xl font-medium mt-10 mb-3">🚀 Our Mission</h2>
      <p className="mb-6">
        To provide high-quality products at fair prices while ensuring a smooth and enjoyable shopping experience for everyone.
      </p>

      {/* OFFER */}
      <h2 className="text-xl font-medium mt-10 mb-3">🛍️ What We Offer</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Wide range of tech and lifestyle products</li>
        <li>Secure payments (Stripe integration)</li>
        <li>Seller marketplace platform</li>
        <li>Fast and reliable delivery</li>
      </ul>

      {/* WHY */}
      <h2 className="text-xl font-medium mt-10 mb-3">🤝 Why Choose Us</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Trusted sellers</li>
        <li>Transparent pricing</li>
        <li>Modern and user-friendly interface</li>
        <li>Customer-first approach</li>
      </ul>

    </div>
  );
}