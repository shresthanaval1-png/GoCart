'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import RelatedProducts from "@/components/RelatedProducts"; // ✅ ADDED
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState();
    const products = useSelector(state => state.product.list);

    const fetchProduct = async () => {
        const product = products.find((product) => product.id === productId);
        setProduct(product);
    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProduct()
        }
        scrollTo(0, 0)
    }, [productId, products]);

    return (
        <div className="px-4 md:px-6">

            <div className="max-w-7xl mx-auto">

                {/* 🔹 BREADCRUMB */}
                <div className="text-gray-500 text-sm mt-6 mb-6 flex items-center gap-2">
                    <span className="hover:text-indigo-600 cursor-pointer">Home</span>
                    <span>/</span>
                    <span className="hover:text-indigo-600 cursor-pointer">Products</span>
                    <span>/</span>
                    <span className="text-gray-800 font-medium">
                        {product?.category}
                    </span>
                </div>

                {/* 🔥 PRODUCT DETAILS */}
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                    {product && (<ProductDetails product={product} />)}
                </div>

                {/* 📄 DESCRIPTION */}
                <div className="mt-10 bg-white rounded-xl shadow-sm p-4 md:p-6">
                    {product && (<ProductDescription product={product} />)}
                </div>

                {/* 🛍️ RELATED PRODUCTS (NEW) */}
                <div className="mt-10">
                    {product && <RelatedProducts product={product} />}
                </div>

            </div>
        </div>
    );
}