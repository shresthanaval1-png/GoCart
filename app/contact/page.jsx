'use client'
import { useState } from "react";
import Link from "next/link";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    alert("Message sent successfully!");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-slate-700">

      {/* TITLE */}
      <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>

      <p className="mb-10 text-slate-500">
        We're here to help you with anything you need.
      </p>

      {/* CONTACT INFO */}
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
            <a href="mailto:Gocarthelp@gmail.com" className="text-green-600 hover:underline">
              Gocarthelp@gmail.com
            </a>
          </p>

          <p>
            <b>Address:</b> Ghaziabad, Indirapuram, 201014
          </p>

          {/* TERMS LINKS */}
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

        {/* WHY WE STAND */}
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

      {/* CONTACT FORM */}
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
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Send Message
        </button>

      </form>

    </div>
  );
}