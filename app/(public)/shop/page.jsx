'use client'
import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

function ShopContent() {

    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const sort = searchParams.get('sort')
    const discount = searchParams.get('discount')
    const category = searchParams.get('category') // ✅ FIX ADDED

    const router = useRouter()
    const products = useSelector(state => state.product.list)

    let filteredProducts = [...products]

    // 🔍 SEARCH
    if (search) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    // ✅ CATEGORY FILTER (MOST IMPORTANT FIX)
    if (category) {
        filteredProducts = filteredProducts.filter(product =>
            product.category?.toLowerCase() === category.toLowerCase()
        )
    }

    // ⭐ SORT (SAFE)
    if (sort === 'popular') {
        filteredProducts.sort((a, b) =>
            (b.rating?.length || 0) - (a.rating?.length || 0)
        )
    }

    // 💸 DISCOUNT
    if (discount === 'true') {
        filteredProducts = filteredProducts.filter(p => p.mrp > p.price)
    }

    return (
        <div className="min-h-[70vh] mx-6">
            <div className="max-w-7xl mx-auto">

                <h1
                    onClick={() => router.push('/shop')}
                    className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer"
                >
                    {(search || sort || discount || category) && <MoveLeftIcon size={20} />}
                    All <span className="text-slate-700 font-medium">Products</span>
                </h1>

                <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">

                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="text-slate-400 text-lg">No products found</p>
                    )}

                </div>

            </div>
        </div>
    )
}

export default function Shop() {
    return (
        <Suspense fallback={<div>Loading shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}