'use client'

import { useState, useEffect } from "react"

export default function CheckoutPage() {

  // 🧾 MOCK TOTAL
  const total = 1000

  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(false)

  // 🧮 FINAL TOTAL
  const finalTotal = total - (total * discount) / 100

  // ✅ AUTO APPLY BEST COUPON (STEP 2)
  const autoApplyBestCoupon = async () => {
    try {
      const res = await fetch("/api/coupon/best")
      const data = await res.json()

      if (data.coupon) {
        setCouponCode(data.coupon.code)
        setDiscount(data.coupon.discount)
      }

    } catch (err) {
      console.error(err)
    }
  }

  // 🔥 RUN ON LOAD
  useEffect(() => {
    autoApplyBestCoupon()
  }, [])

  // ✅ MANUAL APPLY
  const applyCoupon = async () => {
    try {
      if (!couponCode) {
        alert("Enter coupon code")
        return
      }

      setLoading(true)

      const res = await fetch("/api/coupon/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: couponCode })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Invalid coupon")
        return
      }

      setDiscount(data.discount)
      alert("✅ Coupon applied")

    } catch (err) {
      console.error(err)
      alert("Error applying coupon")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Checkout
      </h1>

      {/* 🛒 CART SUMMARY */}
      <div className="border p-4 rounded-lg mb-6 bg-white shadow-sm">
        <p className="text-sm text-gray-500">Order Summary</p>
        <p className="mt-2 font-medium">Items Total: ₹{total}</p>
      </div>

      {/* 🎟️ COUPON SECTION */}
      <div className="border p-4 rounded-lg bg-white shadow-sm space-y-3">

        <p className="font-medium">Apply Coupon</p>

        <div className="flex gap-2">
          <input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 border px-3 py-2 rounded-lg"
          />

          <button
            onClick={applyCoupon}
            disabled={loading}
            className="bg-black text-white px-4 rounded-lg"
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        </div>

        {/* ✅ STEP 3 UI */}
        {discount > 0 && (
          <p className="text-green-600 text-sm">
            🎉 Best coupon "{couponCode}" auto applied ({discount}% OFF)
          </p>
        )}

      </div>

      {/* 💰 TOTAL SECTION */}
      <div className="mt-6 border p-4 rounded-lg bg-white shadow-sm space-y-2">

        <div className="flex justify-between text-sm">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>- {discount}%</span>
          </div>
        )}

        <div className="flex justify-between font-semibold text-lg">
          <span>Final Total</span>
          <span>₹{finalTotal}</span>
        </div>

      </div>

      {/* 🧾 PLACE ORDER */}
      <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
        Place Order
      </button>

    </div>
  )
}