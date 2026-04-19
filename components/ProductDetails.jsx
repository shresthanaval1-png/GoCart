'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const router = useRouter()

    const [mainImage, setMainImage] = useState(product.images[0]);

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    // ✅ SAFE RATING CALCULATION
    const averageRating = product.rating?.length
        ? product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length
        : 0;

    return (
        <div className="grid md:grid-cols-2 gap-10">

            {/* 🖼️ LEFT SIDE */}
            <div className="flex gap-4 max-sm:flex-col-reverse">

                {/* THUMBNAILS */}
                <div className="flex md:flex-col gap-3">
                    {product.images.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => setMainImage(image)}
                            className={`bg-slate-100 flex items-center justify-center w-20 h-20 rounded-lg cursor-pointer border transition ${
                                mainImage === image
                                    ? "border-indigo-500"
                                    : "border-transparent hover:border-gray-300"
                            }`}
                        >
                            <Image
                                src={image}
                                alt=""
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* MAIN IMAGE */}
                <div className="flex-1 flex items-center justify-center bg-slate-100 rounded-xl p-6">
                    <Image
                        src={mainImage}
                        alt=""
                        width={350}
                        height={350}
                        className="object-contain hover:scale-105 transition duration-300"
                    />
                </div>

            </div>

            {/* 📦 RIGHT SIDE */}
            <div className="flex flex-col gap-5">

                {/* NAME */}
                <h1 className="text-3xl font-semibold text-slate-800">
                    {product.name}
                </h1>

                {/* ⭐ RATING */}
                <div className='flex items-center gap-2'>
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon
                            key={index}
                            size={16}
                            className='text-transparent'
                            fill={averageRating >= index + 1 ? "#22c55e" : "#d1d5db"}
                        />
                    ))}
                    <p className="text-sm text-slate-500 ml-2">
                        ({product.rating?.length || 0} reviews)
                    </p>
                </div>

                {/* 💰 PRICE */}
                <div className="flex items-center gap-3 flex-wrap">

                    <p className="text-3xl font-bold text-indigo-600">
                        {currency}{product.price}
                    </p>

                    {product.mrp && (
                        <p className="text-lg text-slate-400 line-through">
                            {currency}{product.mrp}
                        </p>
                    )}

                    {product.mrp && (
                        <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded">
                            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                        </span>
                    )}

                </div>

                {/* 💸 SAVE */}
                {product.mrp && (
                    <div className="flex items-center gap-2 text-slate-500">
                        <TagIcon size={16} />
                        <p>
                            Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% right now
                        </p>
                    </div>
                )}

                {/* 📄 DESCRIPTION */}
                <p className="text-slate-600 text-sm leading-relaxed">
                    {product.description || "No description available."}
                </p>

                {/* 🛒 QUANTITY + BUTTON */}
                <div className="flex items-end gap-6 mt-6 flex-wrap">

                    {cart[productId] && (
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium text-slate-700">
                                Quantity
                            </p>
                            <Counter productId={productId} />
                        </div>
                    )}

                    <button
                        onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')}
                        className="bg-indigo-600 text-white px-8 py-3 text-sm font-medium rounded-lg hover:bg-indigo-700 active:scale-95 transition"
                    >
                        {!cart[productId] ? 'Add to Cart' : 'View Cart'}
                    </button>

                </div>

                {/* INFO */}
                <hr className="border-gray-200 my-4" />

                <div className="flex flex-col gap-3 text-sm text-slate-500">
                    <p className="flex items-center gap-3">
                        <EarthIcon size={16} /> Free shipping worldwide
                    </p>
                    <p className="flex items-center gap-3">
                        <CreditCardIcon size={16} /> 100% Secure Payment
                    </p>
                    <p className="flex items-center gap-3">
                        <UserIcon size={16} /> Trusted by 10k+ users
                    </p>
                </div>

            </div>

        </div>
    )
}

export default ProductDetails