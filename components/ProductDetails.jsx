'use client'

import { addToCart, increaseQty, decreaseQty } from "@/lib/features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/lib/features/user/userSlice";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {

    const productId = product?.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);

    // ✅ SAFE WISHLIST (FIXED)
    const wishlist = useSelector(state => state.user?.wishlist || []);

    const dispatch = useDispatch();
    const router = useRouter();

    const [mainImage, setMainImage] = useState(product?.images?.[0] || "/placeholder.png");

    const cartItem = cart[productId];

    // ✅ SAFE CHECK
    const isWishlisted = wishlist.includes(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }));
    };

    const handleBuyNow = () => {
        dispatch(addToCart({ productId }));
        router.push("/cart");
    };

    // ✅ TOGGLE WISHLIST
    const handleWishlist = () => {
        if (isWishlisted) {
            dispatch(removeFromWishlist(productId));
        } else {
            dispatch(addToWishlist(productId));
        }
    };

    const averageRating = product?.rating?.length
        ? product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length
        : 0;

    return (
        <div className="grid md:grid-cols-2 gap-10">

            {/* LEFT */}
            <div className="flex gap-4 max-sm:flex-col-reverse">

                <div className="flex md:flex-col gap-3">
                    {product.images?.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => setMainImage(image)}
                            className={`bg-slate-100 w-20 h-20 flex items-center justify-center rounded-lg cursor-pointer border ${
                                mainImage === image ? "border-indigo-500" : "hover:border-gray-300"
                            }`}
                        >
                            <Image src={image} alt="thumb" width={50} height={50} />
                        </div>
                    ))}
                </div>

                <div className="flex-1 flex items-center justify-center bg-slate-100 rounded-xl p-6">
                    <Image
                        src={mainImage}
                        alt="product"
                        width={350}
                        height={350}
                        className="object-contain"
                    />
                </div>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-5">

                <h1 className="text-3xl font-semibold text-slate-800">
                    {product.name}
                </h1>

                {/* ⭐ RATING */}
                <div className="flex items-center gap-2">
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon
                            key={index}
                            size={16}
                            fill={averageRating >= index + 1 ? "#22c55e" : "#d1d5db"}
                        />
                    ))}
                    <span className="text-sm text-slate-500">
                        ({product.rating?.length || 0} reviews)
                    </span>
                </div>

                {/* 💰 PRICE */}
                <p className="text-2xl font-bold text-indigo-600">
                    {currency}{product.price}
                </p>

                {/* 🛒 BUTTONS */}
                <div className="mt-6 flex flex-col gap-3">

                    <div className="flex gap-3">

                        {/* QUANTITY OR ADD */}
                        {cartItem ? (
                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => dispatch(decreaseQty(productId))}
                                    className="px-4 py-2 bg-gray-100"
                                >
                                    -
                                </button>

                                <span className="px-6">{cartItem}</span>

                                <button
                                    onClick={() => dispatch(increaseQty(productId))}
                                    className="px-4 py-2 bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={addToCartHandler}
                                className="flex-1 bg-yellow-500 text-white py-3 rounded-lg"
                            >
                                Add to Cart
                            </button>
                        )}

                        {/* BUY NOW */}
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-green-600 text-white py-3 rounded-lg"
                        >
                            Buy Now
                        </button>

                    </div>

                    {/* ❤️ WISHLIST */}
                    <button
                        onClick={handleWishlist}
                        className={`w-full py-2 rounded-lg border transition ${
                            isWishlisted
                                ? "bg-red-500 text-white"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        {isWishlisted ? "❤️ Wishlisted" : "🤍 Add to Wishlist"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;