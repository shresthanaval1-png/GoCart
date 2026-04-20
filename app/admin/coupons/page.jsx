'use client'

import { useEffect, useState } from "react"

export default function CouponsPage() {

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    expiresAt: "",
    forNewUser: false,
  })

  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(false)

  // ✅ FETCH COUPONS
  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/admin/coupon/get")
      const data = await res.json()
      setCoupons(data.coupons || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  // ✅ CREATE COUPON
  const createCoupon = async () => {
    try {
      if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiresAt) {
        alert("Fill all fields")
        return
      }

      setLoading(true)

      const payload = {
        ...newCoupon,
        discount: Number(newCoupon.discount),
        expiresAt: new Date(newCoupon.expiresAt).toISOString(),
      }

      const res = await fetch("/api/admin/coupon/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Failed to create coupon")
        return
      }

      alert("✅ Coupon created successfully")

      setNewCoupon({
        code: "",
        discount: "",
        expiresAt: "",
        forNewUser: false,
      })

      fetchCoupons() // 🔥 refresh list

    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // ✅ DELETE COUPON
  const deleteCoupon = async (code) => {
    if (!confirm("Delete this coupon?")) return

    await fetch("/api/admin/coupon/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    })

    fetchCoupons()
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-semibold mb-4">Create Coupon</h1>

      <div className="space-y-4 max-w-md">

        <input
          type="text"
          placeholder="Coupon Code"
          value={newCoupon.code}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, code: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-lg"
        />

        <input
          type="number"
          placeholder="Discount %"
          value={newCoupon.discount}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, discount: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-lg"
        />

        <input
          type="date"
          value={newCoupon.expiresAt}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, expiresAt: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-lg"
        />

        {/* ✅ ONLY NEW USER */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={newCoupon.forNewUser}
            onChange={(e) =>
              setNewCoupon({
                ...newCoupon,
                forNewUser: e.target.checked
              })
            }
          />
          New User
        </label>

        <button
          onClick={createCoupon}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Creating..." : "Create Coupon"}
        </button>

      </div>

      {/* 🔥 COUPON LIST */}
      <div className="mt-10 max-w-md">

        <h2 className="text-xl font-semibold mb-4">All Coupons</h2>

        {coupons.length === 0 && (
          <p className="text-gray-400 text-sm">No coupons yet</p>
        )}

        {coupons.map((c) => (
          <div
            key={c.code}
            className="border p-3 rounded-lg mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{c.code}</p>
              <p className="text-sm text-gray-500">
                {c.discount}% OFF • Expires:{" "}
                {new Date(c.expiresAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => deleteCoupon(c.code)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}