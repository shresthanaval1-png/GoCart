'use client'
import Breadcrumb from "@/components/Breadcrumb";
import { MoveLeftIcon, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Contact() {

  const router = useRouter();

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
          { label: "Contact", href: "/contact" }
        ]}
      />

      {/* 🧾 TITLE */}
      <h1 className="text-4xl font-bold mt-2 mb-3 text-slate-800">
        Contact Us
      </h1>

      <p className="text-slate-500 mb-10">
        We're here to help you anytime 💬
      </p>

      {/* 🔥 GRID */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* 📞 LEFT CARD */}
        <div className="bg-white/80 backdrop-blur-lg border rounded-3xl p-6 shadow-lg space-y-4">

          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Phone size={18} className="text-red-500" />
            Get in Touch
          </h2>

          {/* 🏢 ORGANIZATION */}
          <a
            href="#"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition group"
          >
            <div>
              <p className="text-xs text-slate-400">Organization</p>
              <p className="font-medium group-hover:text-green-600">
                Tech Titans
              </p>
            </div>
          </a>

          {/* 📞 PHONE */}
          <a
            href="tel:+918700525832"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition group"
          >
            <Phone size={16} className="text-green-600" />
            <div>
              <p className="text-xs text-slate-400">Phone</p>
              <p className="font-medium group-hover:text-green-600">
                +91 8700525832
              </p>
            </div>
          </a>

          {/* 📧 EMAIL */}
          <a
            href="mailto:gocarthelp5@gmail.com"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition group"
          >
            <Mail size={16} className="text-blue-500" />
            <div>
              <p className="text-xs text-slate-400">Email</p>
              <p className="font-medium group-hover:text-green-600">
                gocarthelp5@gmail.com
              </p>
            </div>
          </a>

          {/* 📍 ADDRESS */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Ghaziabad+Indirapuram+201014"
            target="_blank"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition group"
          >
            <MapPin size={16} className="text-red-500" />
            <div>
              <p className="text-xs text-slate-400">Address</p>
              <p className="font-medium group-hover:text-green-600">
                Ghaziabad, Indirapuram, 201014
              </p>
            </div>
          </a>

          {/* 🔗 TERMS */}
          <div className="pt-4 border-t flex gap-5 text-sm">
            <button
              onClick={() => router.push("/terms")}
              className="text-green-600 hover:underline"
            >
              Terms & Conditions
            </button>

            <button
              onClick={() => router.push("/privacy-policy")}
              className="text-green-600 hover:underline"
            >
              Privacy Policy
            </button>
          </div>

        </div>

        {/* 💡 RIGHT CARD */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white rounded-3xl p-6 shadow-lg space-y-5">

          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageCircle size={18} />
            Why We Stand
          </h2>

          <p className="text-sm text-slate-300">
            At GoCart, we focus on delivering a seamless and secure shopping experience
            with top-notch support.
          </p>

          <ul className="space-y-2 text-sm text-slate-200">
            <li>✔ Fast and reliable support</li>
            <li>✔ Transparent pricing</li>
            <li>✔ Trusted sellers</li>
            <li>✔ Secure transactions</li>
          </ul>

        </div>

      </div>

      {/* 🚀 CHAT CTA */}
      <div className="mt-14">

        <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden">

          {/* glow effect */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          <h3 className="text-2xl font-semibold mb-2">
            Need Instant Help?
          </h3>

          <p className="text-sm opacity-90 mb-6">
            Chat directly with our support team in real-time 🚀
          </p>

          <button
            onClick={() => router.push("/contact/chat")}
            className="bg-white text-green-600 px-8 py-3 rounded-xl font-medium hover:scale-105 transition shadow-md"
          >
            Start Support Chat 💬
          </button>

        </div>

      </div>

    </div>
  );
}