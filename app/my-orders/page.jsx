'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import StarRating from "@/components/StarRating"

export default function MyOrdersPage() {

  const router = useRouter()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // ⭐ USER RATINGS (STEP 1)
  const [userRatings, setUserRatings] = useState([])

  // ⭐ RATING STATE
  const [ratingData, setRatingData] = useState({
    productId: "",
    orderId: "",
    rating: 5,
    review: ""
  })

  // 🔥 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/my")
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ⭐ FETCH USER RATINGS (STEP 1)
  const fetchUserRatings = async () => {
    try {
      const res = await fetch("/api/rating")
      const data = await res.json()
      setUserRatings(data.ratings || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchOrders()
    fetchUserRatings()
  }, [])

  // 🎨 STATUS COLORS
  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-600"
      case "SHIPPED":
        return "bg-blue-100 text-blue-600"
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // ⭐ CHECK EXISTING RATING (STEP 2)
  const getExistingRating = (productId, orderId) => {
    return userRatings.find(
      r => r.productId === productId && r.orderId === orderId
    )
  }

  // ⭐ OPEN RATING (STEP 4)
  const openRating = (productId, orderId, existing) => {
    setRatingData({
      productId,
      orderId,
      rating: existing?.rating || 5,
      review: existing?.review || ""
    })
  }

  // ⭐ SUBMIT RATING
  const submitRating = async () => {
    try {
      const res = await fetch("/api/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ratingData)
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Failed")
        return
      }

      alert("✅ Rating saved")

      setRatingData({
        productId: "",
        orderId: "",
        rating: 5,
        review: ""
      })

      fetchUserRatings() // refresh after submit

    } catch (err) {
      console.error(err)
      alert("Error submitting rating")
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading orders...
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-gray-600 hover:text-black transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-semibold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white border rounded-xl shadow-sm p-5"
            >

              {/* TOP */}
              <div className="flex justify-between mb-4">

                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order.id.slice(0, 10)}...</p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>

              </div>

              {/* ITEMS */}
              {order.orderItems.map((item) => {

                const existing = getExistingRating(item.productId, order.id)

                return (
                  <div key={item.productId} className="flex gap-4 border-t pt-3">

                    <img
                      src={item.product.images[0]}
                      className="w-16 h-16 rounded-lg border"
                    />

                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      {/* ⭐ BUTTON (STEP 3) */}
                      {order.status === "DELIVERED" && (
                        <button
                          onClick={() =>
                            openRating(item.productId, order.id, existing)
                          }
                          className="mt-2 text-xs bg-black text-white px-3 py-1 rounded"
                        >
                          {existing ? "Edit Review" : "Rate Product"}
                        </button>
                      )}
                    </div>

                    <p className="font-semibold">₹{item.price}</p>

                  </div>
                )
              })}

            </div>

          ))}

        </div>

      )}

      {/* ⭐ RATING MODAL */}
      {ratingData.productId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[350px] space-y-4">

            <h2 className="text-lg font-semibold">
              Rate Product
            </h2>

            <StarRating
              value={ratingData.rating}
              onChange={(val) =>
                setRatingData({
                  ...ratingData,
                  rating: val
                })
              }
            />

            <textarea
              placeholder="Write review..."
              value={ratingData.review}
              onChange={(e) =>
                setRatingData({
                  ...ratingData,
                  review: e.target.value
                })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <button
              onClick={submitRating}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Submit Rating
            </button>

            <button
              onClick={() =>
                setRatingData({
                  productId: "",
                  orderId: "",
                  rating: 5,
                  review: ""
                })
              }
              className="w-full text-sm text-gray-500"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  )
}