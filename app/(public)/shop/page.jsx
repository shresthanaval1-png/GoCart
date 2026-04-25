'use client'
import { Suspense, useState, useEffect } from "react"
import ProductCard from "@/components/ProductCard"
import {
  Speaker,
  Watch,
  Gift,
  Package,
  X,
  ChevronDown
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

function ShopContent() {

  const router = useRouter()
  const searchParams = useSearchParams()
  const products = useSelector(state => state.product.list)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])

  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'default'
  const price = Number(searchParams.get('price')) || 1000
  const rating = Number(searchParams.get('rating')) || 0
  const type = searchParams.get('type') || ''

  const normalizeCategory = (cat) => {
    if (!cat) return ""

    const cleaned = cat.toLowerCase().trim()

    const map = {
      speaker: "speakers",
      speakers: "speakers",

      sport: "sports & outdoors",
      sports: "sports & outdoors",
      "sports & outdoors": "sports & outdoors",
      "sports outdoors": "sports & outdoors",

      toy: "toys & games",
      toys: "toys & games",
      "toys and games": "toys & games",
      "toys & games": "toys & games",
      "toys games": "toys & games",

      watch: "watch",
      decoration: "decoration",
      electronics: "electronics",
      fashion: "fashion",
      books: "books",
      beauty: "beauty",
      mouse: "mouse"
    }

    return map[cleaned] || cleaned
  }

  const toUrlFormat = (cat) =>
    cat.replace(/ & /g, "-").replace(/\s+/g, "-").toLowerCase()

  const selectedCategories = searchParams.get('category')
    ? searchParams.get('category')
        .split(',')
        .map(c => {
          const restored = c
            .replace(/-/g, " ")
            .replace("sports outdoors", "sports & outdoors")
            .replace("toys games", "toys & games")

          return normalizeCategory(restored)
        })
        .filter(Boolean)
    : []

  const fallbackCategories = ["speakers", "watch", "decoration"]

  const categories = [
    ...new Set([
      ...fallbackCategories,
      ...products.flatMap(p =>
        p.categories
          ? p.categories.map(normalizeCategory)
          : p.category
          ? [normalizeCategory(p.category)]
          : []
      )
    ])
  ]

  const categoryIcons = {
    speakers: Speaker,
    watch: Watch,
    decoration: Gift,
  }

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!value || value === "default") params.delete(key)
    else params.set(key, value)
    router.push(`/shop?${params.toString()}`)
  }

  const toggleCategory = (cat) => {
    const safeCat = toUrlFormat(cat)

    let current = searchParams.get('category')
      ? searchParams.get('category').split(',')
      : []

    if (current.includes(safeCat)) {
      current = current.filter(c => c !== safeCat)
    } else {
      current.push(safeCat)
    }

    updateParam("category", current.join(','))
  }

  const resetFilters = () => {
    router.push('/shop')
  }

  let filteredProducts = [...products]

  // 🔍 SEARCH
  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  // ⭐ BEST
  if (type === "best") {
    filteredProducts = products.filter(p => {
      const avg = p.rating?.length
        ? p.rating.reduce((a, c) => a + c.rating, 0) / p.rating.length
        : 0
      return avg >= 4
    })
  }

  // 🔥 DISCOUNT
  if (type === "discount") {
    filteredProducts = filteredProducts.filter(p => p.mrp > p.price)
  }

  // ✅ FINAL FIXED CATEGORY FILTER (IMPORTANT)
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p => {

      const single = normalizeCategory(p.category)

      const multiple = Array.isArray(p.categories)
        ? p.categories.map(c => normalizeCategory(c))
        : []

      const allCategories = [...multiple, single].filter(Boolean)

      return selectedCategories.some(sel =>
        allCategories.includes(sel)
      )
    })
  }

  // ⭐ RATING
  if (type !== "best") {
    filteredProducts = filteredProducts.filter(p => {
      const avg = p.rating?.length
        ? p.rating.reduce((a, c) => a + c.rating, 0) / p.rating.length
        : 0
      return avg >= rating
    })
  }

  // 💰 PRICE
  filteredProducts = filteredProducts.filter(p => p.price <= price)

  // 🔽 SORT
  if (sort === "low") filteredProducts.sort((a, b) => a.price - b.price)
  if (sort === "high") filteredProducts.sort((a, b) => b.price - a.price)

  return (
    <div className="min-h-[70vh] px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex gap-3 mb-3">
          <button
            onClick={() => updateParam("type", "")}
            className={`px-4 py-1 rounded-full border text-sm
              ${!type ? "bg-indigo-600 text-white" : "bg-white"}
            `}
          >
            All
          </button>

          <button
            onClick={() => {
              updateParam("rating", "")
              updateParam("type", "best")
            }}
            className={`px-4 py-1 rounded-full border text-sm
              ${type === "best" ? "bg-indigo-600 text-white" : "bg-white"}
            `}
          >
            ⭐ Best
          </button>

          <button
            onClick={() => updateParam("type", "discount")}
            className={`px-4 py-1 rounded-full border text-sm
              ${type === "discount" ? "bg-indigo-600 text-white" : "bg-white"}
            `}
          >
            🔥 Discount
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 mb-4">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat] || Package
            const active = selectedCategories.includes(cat)

            return (
              <div
                key={i}
                onClick={() => toggleCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer whitespace-nowrap
                ${active ? "bg-indigo-600 text-white" : "bg-white hover:bg-gray-100"}
                `}
              >
                <Icon size={14} />
                <span className="text-sm capitalize">
                  {cat.replace(/-/g, " ")}
                </span>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-40 rounded-lg"></div>
                <div className="h-4 bg-gray-200 mt-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 mt-1 w-1/2"></div>
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No products found
            </p>
          )}

        </div>

      </div>
    </div>
  )
}

export default function Shop() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  )
}