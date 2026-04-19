'use client'

import Loading from "@/components/Loading"
import OrdersAreaChart from "@/components/OrdersAreaChart"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import {
    CircleDollarSignIcon,
    ShoppingBasketIcon,
    StoreIcon,
    TagsIcon
} from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminDashboard() {

    const { getToken } = useAuth()
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [loading, setLoading] = useState(true)

    const [dashboardData, setDashboardData] = useState({
        products: 0,
        revenue: 0,
        orders: 0,
        stores: 0,
        allOrders: [],
    })

    const dashboardCardsData = [
        {
            title: 'Total Products',
            value: dashboardData.products,
            icon: ShoppingBasketIcon
        },
        {
            title: 'Revenue',
            value: currency + dashboardData.revenue,
            icon: CircleDollarSignIcon
        },
        {
            title: 'Orders',
            value: dashboardData.orders,
            icon: TagsIcon
        },
        {
            title: 'Stores',
            value: dashboardData.stores,
            icon: StoreIcon
        },
    ]

    const fetchDashboardData = async () => {
        try {
            const token = await getToken()

            const { data } = await axios.get('/api/admin/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            })

            setDashboardData(data.dashboardData)

        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-slate-600">

            {/* 🔥 HEADER */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    Admin <span className="text-green-600">Dashboard</span>
                </h1>
                <p className="text-sm text-gray-400">
                    Overview of your platform performance
                </p>
            </div>

            {/* 🔥 STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {dashboardCardsData.map((card, index) => {
                    const Icon = card.icon

                    return (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02] flex items-center justify-between"
                        >
                            <div>
                                <p className="text-sm text-gray-400">{card.title}</p>
                                <h2 className="text-2xl font-bold mt-1 text-slate-800">
                                    {card.value}
                                </h2>
                            </div>

                            <div className="p-3 bg-green-50 rounded-full">
                                <Icon className="text-green-600" size={26} />
                            </div>
                        </div>
                    )
                })}

            </div>

            {/* 🔥 CHART SECTION */}
            <div className="mt-10 bg-white rounded-xl shadow p-5">

                <h2 className="text-lg font-semibold mb-4 text-slate-700">
                    Orders Overview
                </h2>

                <OrdersAreaChart allOrders={dashboardData.allOrders} />

            </div>

        </div>
    )
}