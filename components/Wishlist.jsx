'use client'

import { useSelector } from "react-redux"

export default function Wishlist() {

  const wishlist = useSelector(state => state.user.wishlist)
  const products = useSelector(state => state.product.list)

  const items = products.filter(p => wishlist.includes(p.id))

  if (items.length === 0) {
    return <p>No wishlist items</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {items.map(item => (
        <div key={item.id} className="border p-3 rounded">

          <img src={item.images[0]} className="h-40 object-cover w-full" />

          <p className="mt-2">{item.name}</p>

        </div>
      ))}

    </div>
  )
}