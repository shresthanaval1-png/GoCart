'use client'

import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminApprove() {

    const { user } = useUser()
    const { getToken } = useAuth()

    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchStores = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/admin/approve-store', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setStores(data.stores)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
        setLoading(false)
    }

    const handleApprove = async ({ storeId, status }) => {
        try {
            const token = await getToken()

            const { data } = await axios.post(
                '/api/admin/approve-store',
                { storeId, status },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            toast.success(data.message)
            await fetchStores()

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
        <div className="text-slate-600 mb-20">

            {/* 🔥 HEADER */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    Approve <span className="text-green-600">Stores</span>
                </h1>
                <p className="text-sm text-gray-400">
                    Review and manage store applications
                </p>
            </div>

            {/* 🔥 STORE LIST */}
            {stores.length ? (

                <div className="flex flex-col gap-5">

                    {stores.map((store) => (

                        <div
                            key={store.id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col md:flex-row gap-6 md:items-end justify-between"
                        >

                            {/* STORE INFO */}
                            <StoreInfo store={store} />

                            {/* ACTIONS */}
                            <div className="flex gap-3 flex-wrap">

                                <button
                                    onClick={() =>
                                        toast.promise(
                                            handleApprove({ storeId: store.id, status: 'approved' }),
                                            { loading: "Approving..." }
                                        )
                                    }
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm 
                                    hover:bg-green-700 hover:scale-105 active:scale-95 transition"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() =>
                                        toast.promise(
                                            handleApprove({ storeId: store.id, status: 'rejected' }),
                                            { loading: "Rejecting..." }
                                        )
                                    }
                                    className="px-4 py-2 bg-slate-500 text-white rounded-lg text-sm 
                                    hover:bg-slate-600 hover:scale-105 active:scale-95 transition"
                                >
                                    Reject
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                /* 🔥 EMPTY STATE */
                <div className="flex flex-col items-center justify-center h-80 bg-white rounded-xl shadow">

                    <h1 className="text-2xl text-slate-400 font-medium">
                        No Applications Pending
                    </h1>

                    <p className="text-sm text-gray-400 mt-2">
                        All stores are reviewed 🎉
                    </p>

                </div>
            )}

        </div>
    )
}