'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const ProductDescription = ({ product }) => {

    return (
        <div className="my-10 text-sm text-slate-600">

            {/* 📄 DESCRIPTION */}
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-slate-800 mb-2">
                    Description
                </h2>

                <p className="max-w-2xl leading-relaxed">
                    {product.description}
                </p>
            </div>

            {/* ⭐ REVIEWS */}
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                    Customer Reviews
                </h2>

                {product.rating?.length === 0 && (
                    <p className="text-slate-400">No reviews yet.</p>
                )}

                <div className="flex flex-col gap-6">

                    {product.rating?.map((item, index) => (
                        <div
                            key={index}
                            className="flex gap-4 p-4 rounded-lg border hover:shadow-sm transition"
                        >

                            {/* 👤 USER IMAGE */}
                            <Image
                                src={item.user?.image || "/user.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full object-cover"
                                width={40}
                                height={40}
                            />

                            <div>

                                {/* ⭐ STARS */}
                                <div className="flex gap-1">
                                    {Array(5).fill('').map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            size={16}
                                            fill={item.rating >= i + 1 ? "#22c55e" : "#e5e7eb"}
                                            stroke="none"
                                        />
                                    ))}
                                </div>

                                {/* 📝 REVIEW */}
                                <p className="text-sm mt-2 max-w-lg">
                                    {item.review || "No review provided"}
                                </p>

                                {/* 👤 USER + DATE */}
                                <p className="text-xs text-slate-500 mt-1">
                                    {item.user?.name || "Anonymous"} •{" "}
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </p>

                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* 🏪 STORE */}
            <div className="flex gap-3 mt-12 items-center">

                <Image
                    src={product.store?.logo || "/store.png"}
                    alt="store"
                    className="w-12 h-12 rounded-full ring ring-slate-300 object-cover"
                    width={48}
                    height={48}
                />

                <div>
                    <p className="font-medium text-slate-700">
                        Product by {product.store?.name}
                    </p>

                    <Link
                        href={`/shop/${product.store?.username}`}
                        className="flex items-center gap-1.5 text-green-500 text-sm"
                    >
                        Visit Store <ArrowRight size={14} />
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default ProductDescription