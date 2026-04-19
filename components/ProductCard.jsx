'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate average rating safely
    const rating = product.rating.length > 0
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : 0;

    return (
        <Link href={`/product/${product.id}`} className='group block max-w-[220px] mx-auto'>

            {/* Image Container */}
            <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex items-center justify-center h-48 overflow-hidden'>
                <Image
                    width={400}
                    height={400}
                    className='object-contain max-h-36 w-auto group-hover:scale-110 transition duration-300'
                    src={product.images[0]}
                    alt={product.name}
                />
            </div>

            {/* Product Info */}
            <div className='mt-3 space-y-1'>

                {/* Name */}
                <p className='text-sm font-medium text-gray-800 line-clamp-2'>
                    {product.name}
                </p>

                {/* Rating */}
                <div className='flex items-center gap-1'>
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon
                            key={index}
                            size={14}
                            className='mt-0.5'
                            fill={rating >= index + 1 ? "#22c55e" : "#e5e7eb"}
                            stroke="none"
                        />
                    ))}
                </div>

                {/* Price */}
                <p className='text-base font-semibold text-indigo-600'>
                    {currency}{product.price}
                </p>

            </div>
        </Link>
    )
}

export default ProductCard