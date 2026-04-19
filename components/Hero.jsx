'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import { useRouter } from 'next/navigation'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const router = useRouter()

    return (
        <div className='mx-4 md:mx-6'>
            <div className='flex max-xl:flex-col gap-6 max-w-7xl mx-auto my-8'>

                {/* LEFT HERO */}
                <div className='relative flex-1 flex flex-col justify-between bg-gradient-to-br from-green-200 via-green-100 to-white rounded-3xl min-h-[320px] sm:min-h-[420px] overflow-hidden shadow-sm hover:shadow-md transition group'>

                    <div className='p-6 sm:p-12 z-10'>

                        {/* TOP BADGE */}
                        <div className='inline-flex items-center gap-2 bg-green-100 text-green-700 pr-3 pl-1 py-1 rounded-full text-xs sm:text-sm'>
                            <span className='bg-green-600 px-2 py-0.5 rounded-full text-white text-xs'>
                                NEW
                            </span>
                            Free Shipping on Orders Above $50
                            <ChevronRightIcon className='group-hover:ml-1 transition-all' size={14} />
                        </div>

                        {/* HEADING */}
                        <h2 className='text-3xl sm:text-5xl font-semibold leading-tight mt-4 max-w-md text-slate-800'>
                            Gadgets you'll love.
                            <span className='block text-green-600'>
                                Prices you'll trust.
                            </span>
                        </h2>

                        {/* PRICE */}
                        <div className='text-slate-700 text-sm font-medium mt-6'>
                            <p>Starting from</p>
                            <p className='text-3xl font-bold'>
                                {currency}4.90
                            </p>
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={() => router.push('/shop')}
                            className='mt-6 bg-slate-900 text-white text-sm px-6 py-2.5 sm:px-10 sm:py-3 rounded-lg hover:bg-black hover:scale-105 active:scale-95 transition'
                        >
                            Shop Now
                        </button>
                    </div>

                    {/* IMAGE */}
                    <Image
                        className='absolute bottom-0 right-0 w-full max-w-[260px] sm:max-w-sm object-contain group-hover:scale-105 transition duration-300'
                        src={assets.hero_model_img}
                        alt=""
                    />
                </div>

                {/* RIGHT CARDS */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm'>

                    {/* BEST PRODUCTS */}
                    <div className='flex-1 flex items-center justify-between bg-orange-100 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition group cursor-pointer'>
                        <div>
                            <p className='text-2xl sm:text-3xl font-semibold text-slate-800 max-w-36'>
                                Best Products
                            </p>

                            <p
                                onClick={() => router.push('/shop?type=best')}
                                className='flex items-center gap-1 mt-4 text-slate-600 hover:text-orange-600 transition'
                            >
                                View more
                                <ArrowRightIcon className='group-hover:ml-1 transition-all' size={16} />
                            </p>
                        </div>

                        <Image className='w-24 sm:w-28 group-hover:scale-105 transition' src={assets.hero_product_img1} alt="" />
                    </div>

                    {/* DISCOUNTS */}
                    <div className='flex-1 flex items-center justify-between bg-blue-100 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition group cursor-pointer'>
                        <div>
                            <p className='text-2xl sm:text-3xl font-semibold text-slate-800 max-w-36'>
                                20% Discounts
                            </p>

                            <p
                                onClick={() => router.push('/shop?type=discount')}
                                className='flex items-center gap-1 mt-4 text-slate-600 hover:text-blue-600 transition'
                            >
                                View more
                                <ArrowRightIcon className='group-hover:ml-1 transition-all' size={16} />
                            </p>
                        </div>

                        <Image className='w-24 sm:w-28 group-hover:scale-105 transition' src={assets.hero_product_img2} alt="" />
                    </div>

                </div>
            </div>

            {/* CATEGORY MARQUEE */}
            <div className='mt-6'>
                <CategoriesMarquee />
            </div>
        </div>
    )
}

export default Hero