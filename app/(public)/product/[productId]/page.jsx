'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import RelatedProducts from "@/components/RelatedProducts";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Product() {

    const { productId } = useParams();
    const router = useRouter()

    const [product, setProduct] = useState(null);
    const products = useSelector(state => state.product.list);

    const fetchProduct = () => {
        const found = products.find((p) => p.id === productId);
        setProduct(found);
    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProduct()
        }
        window.scrollTo(0, 0)
    }, [productId, products]);

    // 🔙 BACK BUTTON
    const handleBack = () => {
        router.push('/shop')
    }

    // ✅ LOADING
    if (!product) {
        return (
            <div className="p-10 text-center text-gray-500">
                Loading product...
            </div>
        )
    }

    return (
        <div className="px-4 md:px-6">

            <div className="max-w-7xl mx-auto">

                {/* 🔝 TOP NAV SECTION */}
                <div className="pt-6 flex flex-col gap-3">

                    {/* 🔙 PREMIUM BACK BUTTON */}
                    <button
                        onClick={handleBack}
                        className="w-fit flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300 text-sm shadow-sm"
                    >
                        ← Back to Shop
                    </button>

                    {/* 🧭 BREADCRUMB */}
                    <div className="text-sm flex items-center gap-2 text-gray-500 flex-wrap">

                        <span
                            onClick={() => router.push('/')}
                            className="cursor-pointer hover:text-black"
                        >
                            Home
                        </span>

                        <span>/</span>

                        <span
                            onClick={() => router.push('/shop')}
                            className="cursor-pointer hover:text-black"
                        >
                            Products
                        </span>

                        {product?.category && (
                            <>
                                <span>/</span>
                                <span
                                    onClick={() => router.push(`/shop?category=${product.category}`)}
                                    className="cursor-pointer hover:text-black capitalize"
                                >
                                    {product.category}
                                </span>
                            </>
                        )}

                        <span>/</span>

                        <span className="text-black font-medium">
                            {product.name}
                        </span>

                    </div>

                </div>

                {/* 🔥 PRODUCT DETAILS */}
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mt-6">
                    <ProductDetails product={product} />
                </div>

                {/* 📄 DESCRIPTION */}
                <div className="mt-10 bg-white rounded-xl shadow-sm p-4 md:p-6">
                    <ProductDescription product={product} />
                </div>

                {/* 🛍️ RELATED PRODUCTS */}
                <div className="mt-10">
                    <RelatedProducts product={product} />
                </div>

            </div>
        </div>
    );
}