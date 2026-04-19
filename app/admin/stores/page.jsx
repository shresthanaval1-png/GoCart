'use client'

import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminStores() {

    const { user } = useUser()
    const { getToken } = useAuth()

    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchStores = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/admin/stores', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setStores(data.stores)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
        setLoading(false)
    }

    const toggleIsActive = async (storeId) => {
        try {
            const token = await getToken()

            const { data } = await axios.post(
                '/api/admin/toggle-store',
                { storeId },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            await fetchStores()
            toast.success(data.message)

        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchStores()
        }
    }, [user])

    if (loading) return <Loading />

    return (
        <div className="text-slate-600 mb-24">

            {/* 🔥 HEADER */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    Live <span className="text-green-600">Stores</span>
                </h1>
                <p className="text-sm text-gray-400">
                    Manage and control active stores
                </p>
            </div>

            {/* 🔥 STORE LIST */}
            {stores.length ? (

                <div className="flex flex-col gap-5">

                    {stores.map((store) => (

                        <div
                            key={store.id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 hover:-translate-y-1 p-6 flex flex-col md:flex-row gap-6 md:items-end justify-between"
                        >

                            {/* STORE INFO */}
                            <StoreInfo store={store} />

                            {/* ACTIONS */}
                            <div className="flex items-center gap-4 pt-2 flex-wrap">

                                <span className="text-sm font-medium text-slate-600">
                                    Active
                                </span>

                                {/* 🔥 TOGGLE */}
                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={store.isActive}
                                        onChange={() =>
                                            toast.promise(
                                                toggleIsActive(store.id),
                                                { loading: "Updating..." }
                                            )
                                        }
                                    />

                                    <div className="w-11 h-6 bg-slate-300 rounded-full 
                                    peer peer-checked:bg-green-600 
                                    transition-colors duration-200"></div>

                                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
                                    transition-transform duration-200 
                                    peer-checked:translate-x-5"></span>

                                </label>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                /* 🔥 EMPTY STATE */
                <div className="flex flex-col items-center justify-center h-80 bg-white rounded-xl shadow">

                    <h1 className="text-2xl text-slate-400 font-medium">
                        No Stores Available
                    </h1>

                    <p className="text-sm text-gray-400 mt-2">
                        Stores will appear here once created
                    </p>

                </div>
            )}

        </div>
    )
}