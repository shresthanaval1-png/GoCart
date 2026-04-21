'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // ⭐ average rating
    const avgRating = product.rating?.length > 0
        ? (product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : 0

    // 🔥 discount %
    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0

    return (
        <Link href={`/product/${product.id}`} className='group block max-w-[220px] mx-auto'>

            {/* IMAGE */}
            <div className='relative bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 flex items-center justify-center h-48 overflow-hidden'>

                <Image
                    width={400}
                    height={400}
                    className='object-contain max-h-36 w-auto group-hover:scale-110 transition duration-300'
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                />

                {/* 🔥 DISCOUNT BADGE */}
                {discount > 0 && (
                    <span className='absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded'>
                        {discount}% OFF
                    </span>
                )}

            </div>

            {/* DETAILS */}
            <div className='mt-3 space-y-1'>

                {/* NAME */}
                <p className='text-sm font-medium text-gray-800 line-clamp-2'>
                    {product.name}
                </p>

                {/* ⭐ RATING */}
                <div className='flex items-center gap-2'>

                    <div className='flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs'>
                        {avgRating.toFixed(1)}
                        <StarIcon size={12} className='ml-1' />
                    </div>

                    <span className='text-xs text-gray-400'>
                        ({product.rating?.length || 0})
                    </span>

                </div>

                {/* 💰 PRICE */}
                <div className='flex items-center gap-2'>

                    <p className='text-base font-semibold text-indigo-600'>
                        {currency}{product.price}
                    </p>

                    {product.oldPrice && (
                        <span className='text-gray-400 line-through text-sm'>
                            {currency}{product.oldPrice}
                        </span>
                    )}

                </div>

            </div>

        </Link>
    )
}

export default ProductCard