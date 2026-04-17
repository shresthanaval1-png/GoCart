'use client'
import { useState } from "react";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Contact() {

  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert(data.error || "Failed to send message");
      }

    } catch (error) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-slate-700">

      {/* ✅ BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="mb-4 p-2 rounded-full hover:bg-slate-100 transition text-slate-500 hover:text-green-600"
      >
        <MoveLeftIcon size={20} />
      </button>

      <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>

      <p className="mb-10 text-slate-500">
        We're here to help you with anything you need.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mb-12">

        <div className="space-y-4">
          <h2 className="text-xl font-medium">📞 Get in Touch</h2>

          <p><b>Organization:</b> Tech Titans</p>

          <p>
            <b>Phone:</b>{" "}
            <a href="tel:+918700525832" className="text-green-600 hover:underline">
              +91 8700525832
            </a>
          </p>

          <p>
            <b>Email:</b>{" "}
            <a href="mailto:gocarthelp5@gmail.com" className="text-green-600 hover:underline">
              gocarthelp5@gmail.com
            </a>
          </p>

          <p>
            <b>Address:</b> Ghaziabad, Indirapuram, 201014
          </p>

          <div className="pt-4">
            <p className="text-sm">
              <Link href="/terms" className="text-green-600 hover:underline">
                Terms & Conditions
              </Link>{" "}
              •{" "}
              <Link href="/privacy-policy" className="text-green-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium">💬 Why We Stand</h2>

          <p>
            At GoCart, we believe in putting customers first. Our mission is to provide
            a smooth, secure, and reliable shopping experience.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>Fast and reliable support</li>
            <li>Transparent pricing</li>
            <li>Trusted sellers</li>
            <li>Secure transactions</li>
          </ul>
        </div>

      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full border border-slate-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

      </form>

    </div>
  );
}