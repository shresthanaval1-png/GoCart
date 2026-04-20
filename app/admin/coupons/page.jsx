'use client'

import { useState } from "react";

export default function CouponsPage() {

  // ✅ FIX: STATE ADDED (this was missing)
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    expiresAt: "",
    forNewUser: false,
    forMember: false,
  });

  return (
    <div className="p-6">

      <h1 className="text-2xl font-semibold mb-4">Create Coupon</h1>

      {/* 🔥 FORM */}
      <div className="space-y-4 max-w-md">

        {/* CODE */}
        <input
          type="text"
          placeholder="Coupon Code"
          value={newCoupon.code}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, code: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-lg"
        />

        {/* DISCOUNT */}
        <input
          type="number"
          placeholder="Discount %"
          value={newCoupon.discount}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, discount: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-lg"
        />

        {/* EXPIRY */}
        <input
          type="date"
          value={newCoupon.expiresAt}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, expiresAt: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-lg"
        />

        {/* 🔥 TOGGLES */}
        <div className="flex gap-4 text-sm mt-2">

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-green-600 w-4 h-4"
              checked={newCoupon.forNewUser}
              onChange={(e) =>
                setNewCoupon({
                  ...newCoupon,
                  forNewUser: e.target.checked
                })
              }
            />
            <span>New User</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-green-600 w-4 h-4"
              checked={newCoupon.forMember}
              onChange={(e) =>
                setNewCoupon({
                  ...newCoupon,
                  forMember: e.target.checked
                })
              }
            />
            <span>Member</span>
          </label>

        </div>

        {/* BUTTON */}
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Create Coupon
        </button>

      </div>

    </div>
  );
}