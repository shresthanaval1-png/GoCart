'use client'
import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import Breadcrumb from "@/components/Breadcrumb"
import { MoveLeftIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

function ShopContent() {

    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const sort = searchParams.get('sort')
    const discount = searchParams.get('discount')
    const category = searchParams.get('category')
    const type = searchParams.get('type')

    const router = useRouter()
    const products = useSelector(state => state.product.list)

    let filteredProducts = [...products]

    // 🔍 SEARCH
    if (search) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    // 📂 CATEGORY
    if (category) {
        filteredProducts = filteredProducts.filter(product =>
            product.category?.toLowerCase() === category.toLowerCase()
        )
    }

    // ⭐ SORT
    if (sort === 'popular') {
        filteredProducts.sort((a, b) =>
            (b.rating?.length || 0) - (a.rating?.length || 0)
        )
    }

    // 💸 DISCOUNT
    if (discount === 'true') {
        filteredProducts = filteredProducts.filter(p => p.mrp > p.price)
    }

    // 🔥 BEST SELLERS
    if (type === 'best') {
        filteredProducts = filteredProducts.filter(p => {
            const avgRating = p.rating?.length
                ? p.rating.reduce((acc, curr) => acc + curr.rating, 0) / p.rating.length
                : 0
            return avgRating >= 4
        })
    }

    // 🔥 DISCOUNT TAB
    if (type === 'discount') {
        filteredProducts = filteredProducts.filter(p => p.mrp > p.price)
    }

    return (
        <div className="min-h-[70vh] px-6">
            <div className="max-w-7xl mx-auto">

                {/* 🔙 BACK BUTTON */}
                <button
                    onClick={() => router.back()}
                    className="mt-6 mb-3 p-2 rounded-full hover:bg-slate-100 transition text-slate-500 hover:text-green-600"
                >
                    <MoveLeftIcon size={20} />
                </button>

                {/* 🍞 BREADCRUMB */}
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Shop", href: "/shop" },
                    ]}
                />

                {/* 🧾 TITLE */}
                <h1 className="text-2xl text-slate-700 font-semibold mt-2 mb-5">
                    All Products
                </h1>

                {/* 🧩 FILTER TABS */}
                <div className="flex gap-3 mb-8 flex-wrap">

                    <button
                        onClick={() => router.push('/shop')}
                        className={`px-4 py-2 rounded-full text-sm transition ${
                            !type ? "bg-green-600 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        All Products
                    </button>

                    <button
                        onClick={() => router.push('/shop?type=best')}
                        className={`px-4 py-2 rounded-full text-sm transition ${
                            type === 'best' ? "bg-green-600 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        ⭐ Best Sellers
                    </button>

                    <button
                        onClick={() => router.push('/shop?type=discount')}
                        className={`px-4 py-2 rounded-full text-sm transition ${
                            type === 'discount' ? "bg-green-600 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        🔥 Discounts
                    </button>

                </div>

                {/* 🛍 PRODUCTS */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-32">

                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="text-slate-400 text-lg col-span-full text-center">
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
        <Suspense fallback={<div>Loading shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}