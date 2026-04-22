'use client'

import { useSelector, useDispatch } from "react-redux"
import { removeFromWishlist } from "@/lib/features/user/userSlice"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function WishlistPage() {

  const dispatch = useDispatch()
  const router = useRouter()

  const wishlist = useSelector(state => state.user.wishlist)
  const products = useSelector(state => state.product.list)

  // ✅ MAP WISHLIST PRODUCTS
  const wishlistProducts = wishlist
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-black mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-6">
        My Wishlist ({wishlistProducts.length})
      </h1>

      {/* ❌ EMPTY */}
      {wishlistProducts.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <p className="text-xl">Your wishlist is empty</p>
        </div>
      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {wishlistProducts.map((item) => (

            <div
              key={item.id}
              className="border rounded-xl p-4 hover:shadow-md transition"
            >

              {/* IMAGE CLICK */}
              <div
                onClick={() => router.push(`/product/${item.id}`)}
                className="cursor-pointer"
              >
                <Image
                  src={item.images?.[0] || "/placeholder.png"}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="mx-auto object-contain h-40"
                />
              </div>

              {/* NAME */}
              <p className="mt-3 text-sm font-medium line-clamp-2">
                {item.name}
              </p>

              {/* PRICE */}
              <p className="text-indigo-600 font-semibold mt-1">
                ₹{item.price}
              </p>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="mt-3 w-full text-sm bg-red-500 text-white py-1.5 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}