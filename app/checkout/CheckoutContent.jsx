'use client'

import { useSearchParams } from "next/navigation"

export default function CheckoutContent() {

  const searchParams = useSearchParams()

  const id = searchParams.get("id") // example

  return (
    <div className="p-10">
      <h1 className="text-xl font-semibold">Checkout Page</h1>
      <p>Product ID: {id}</p>
    </div>
  )
}