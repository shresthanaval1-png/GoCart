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

  useEffect(()=>{
    setTimeout(()=>setLoading(false), 500)
  },[])

  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'default'
  const price = Number(searchParams.get('price')) || 1000
  const rating = Number(searchParams.get('rating')) || 0
  const type = searchParams.get('type') || ''
  const selectedCategories = searchParams.get('category')?.split(',') || []

  const fallbackCategories = ["speaker","watch","decoration"]

  const categories = [
    ...new Set([
      ...fallbackCategories,
      ...products.flatMap(p =>
        p.categories ? p.categories : p.category ? [p.category] : []
      )
    ].map(c => c.toLowerCase().trim()))
  ].filter(c => c !== "earphone" && c !== "toys")

  const categoryIcons = {
    speaker: Speaker,
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
    let updated = [...selectedCategories]
    if (updated.includes(cat)) updated = updated.filter(c => c !== cat)
    else updated.push(cat)
    updateParam("category", updated.join(','))
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

  // 🔥 BEST (FIXED - independent)
  if (type === "best") {
    filteredProducts = products.filter(p => {
      const avg = p.rating?.length
        ? p.rating.reduce((a,c)=>a+c.rating,0)/p.rating.length
        : 0
      return avg >= 4
    })
  }

  // 🔥 DISCOUNT
  if (type === "discount") {
    filteredProducts = filteredProducts.filter(p => p.mrp > p.price)
  }

  // 📂 CATEGORY
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      const cats = p.categories ? p.categories : p.category ? [p.category] : []
      return cats.some(c =>
        selectedCategories.includes(c.toLowerCase().trim())
      )
    })
  }

  // ⭐ RATING
  if (type !== "best") {
    filteredProducts = filteredProducts.filter(p => {
      const avg = p.rating?.length
        ? p.rating.reduce((a,c)=>a+c.rating,0)/p.rating.length
        : 0
      return avg >= rating
    })
  }

  // 💰 PRICE
  filteredProducts = filteredProducts.filter(p => p.price <= price)

  // 🔽 SORT
  if (sort === "low") filteredProducts.sort((a,b)=>a.price-b.price)
  if (sort === "high") filteredProducts.sort((a,b)=>b.price-a.price)

  const [ratingOpen, setRatingOpen] = useState(false)

  return (
    <div className="min-h-[70vh] px-6">
      <div className="max-w-7xl mx-auto">

        {/* TYPE FILTER */}
        <div className="flex gap-3 mb-3">
          <button
            onClick={()=>updateParam("type","")}
            className={`px-4 py-1 rounded-full border text-sm
              ${!type ? "bg-indigo-600 text-white" : "bg-white"}
            `}
          >
            All
          </button>

          <button
            onClick={()=>{
              updateParam("rating","")
              updateParam("type","best")
            }}
            className={`px-4 py-1 rounded-full border text-sm
              ${type==="best" ? "bg-indigo-600 text-white" : "bg-white"}
            `}
          >
            ⭐ Best
          </button>

          <button
            onClick={()=>updateParam("type","discount")}
            className={`px-4 py-1 rounded-full border text-sm
              ${type==="discount" ? "bg-indigo-600 text-white" : "bg-white"}
            `}
          >
            🔥 Discount
          </button>
        </div>

        {/* CATEGORY CHIPS */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-4">
          {categories.map((cat,i)=>{
            const Icon = categoryIcons[cat] || Package
            const active = selectedCategories.includes(cat)

            return (
              <div
                key={i}
                onClick={()=>toggleCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer whitespace-nowrap
                ${active ? "bg-indigo-600 text-white" : "bg-white hover:bg-gray-100"}
                `}
              >
                <Icon size={14}/>
                <span className="text-sm capitalize">{cat}</span>
              </div>
            )
          })}
        </div>

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-4">

          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat,i)=>(
              <div key={i} className="flex items-center gap-1 bg-indigo-100 px-3 py-1 rounded-full text-xs">
                {cat}
                <X size={12} onClick={()=>toggleCategory(cat)} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetFilters}
              className="px-3 py-2 text-xs border rounded-lg bg-white hover:bg-gray-100 min-w-[80px]"
            >
              Reset
            </button>

            <select
              value={sort}
              onChange={(e)=>updateParam("sort",e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm bg-white shadow-sm"
            >
              <option value="default">Sort</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>

        </div>

        {/* FILTER ROW */}
        <div className="flex gap-6 mb-6">

          <div className="relative">
            <button
              onClick={()=>setRatingOpen(!ratingOpen)}
              className="border px-4 py-2 rounded-lg text-sm bg-white shadow-sm flex items-center gap-2"
            >
              Rating <ChevronDown size={14}/>
            </button>

            <div className={`absolute top-12 left-0 bg-white shadow-lg rounded-lg p-3 w-40 transition-all duration-300
              ${ratingOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
            `}>
              {[4,3,2,1].map((r)=>(
                <div key={r}
                  onClick={()=>updateParam("rating",r)}
                  className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                >
                  <span className="text-yellow-500">
                    {"★".repeat(r)}{"☆".repeat(5-r)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-60">
            <p className="text-xs mb-1">Max: ${price}</p>
            <input
              type="range"
              min="0"
              max="1000"
              value={price}
              onChange={(e)=>updateParam("price",e.target.value)}
              className="w-full"
            />
          </div>

        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

          {loading ? (
            Array(8).fill(0).map((_,i)=>(
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-40 rounded-lg"></div>
                <div className="h-4 bg-gray-200 mt-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 mt-1 w-1/2"></div>
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(p=>(
              <ProductCard key={p.id} product={p}/>
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

export default function Shop(){
  return(
    <Suspense>
      <ShopContent/>
    </Suspense>
  )
}