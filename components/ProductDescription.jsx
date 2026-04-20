'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="my-18 text-sm text-slate-600">

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
                {['Description', 'Reviews'].map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTab(tab)}
                        className={`${tab === selectedTab
                            ? 'border-b-[1.5px] font-semibold text-slate-800'
                            : 'text-slate-400'
                        } px-3 py-2 font-medium`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Description */}
            {selectedTab === "Description" && (
                <p className="max-w-xl">{product.description}</p>
            )}

            {/* Reviews */}
            {selectedTab === "Reviews" && (
                <div className="flex flex-col gap-6 mt-10">

                    {product.rating?.length === 0 && (
                        <p className="text-slate-400">No reviews yet.</p>
                    )}

                    {product.rating?.map((item, index) => (
                        <div key={index} className="flex gap-5">

                            {/* ✅ FIXED USER IMAGE */}
                            <Image
                                src={item.user?.image || "/user.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full object-cover"
                                width={40}
                                height={40}
                            />

                            <div>

                                {/* ⭐ STARS */}
                                <div className="flex items-center gap-1">
                                    {Array(5).fill('').map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            size={18}
                                            className="mt-0.5"
                                            fill={item.rating >= i + 1 ? "#00C950" : "#D1D5DB"}
                                            stroke="none"
                                        />
                                    ))}
                                </div>

                                {/* 📝 REVIEW */}
                                <p className="text-sm max-w-lg my-2">
                                    {item.review || "No review provided"}
                                </p>

                                {/* 👤 USER */}
                                <p className="font-medium text-slate-800">
                                    {item.user?.name || "Anonymous"}
                                </p>

                                {/* 📅 DATE */}
                                <p className="mt-1 text-xs text-slate-400">
                                    {new Date(item.createdAt).toDateString()}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Store Page */}
            <div className="flex gap-3 mt-14">

                {/* ✅ SAFE STORE LOGO */}
                <Image
                    src={product.store?.logo || "/store.png"}
                    alt="store"
                    className="w-11 h-11 rounded-full ring ring-slate-300 object-cover"
                    width={44}
                    height={44}
                />

                <div>
                    <p className="font-medium text-slate-600">
                        Product by {product.store?.name}
                    </p>

                    <Link
                        href={`/shop/${product.store?.username}`}
                        className="flex items-center gap-1.5 text-green-500"
                    >
                        view store <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default ProductDescription