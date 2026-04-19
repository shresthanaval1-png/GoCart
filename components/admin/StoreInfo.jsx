'use client'
import Image from "next/image"
import { MapPin, Mail, Phone } from "lucide-react"

const StoreInfo = ({ store }) => {

    const defaultUserImage = "/user.png"
    const defaultStoreLogo = "/store.png"

    return (
        <div className="flex-1 space-y-3 text-sm">

            {/* 🔥 STORE LOGO */}
            <Image
                width={100}
                height={100}
                src={store?.logo || defaultStoreLogo}
                alt={store?.name || "store"}
                className="max-w-20 max-h-20 object-contain shadow rounded-full max-sm:mx-auto"
            />

            {/* 🔥 NAME + STATUS */}
            <div className="flex flex-col sm:flex-row gap-3 items-center">
                <h3 className="text-xl font-semibold text-slate-800">
                    {store?.name || "No Name"}
                </h3>

                <span className="text-sm text-gray-500">
                    @{store?.username || "unknown"}
                </span>

                {/* STATUS BADGE */}
                <span
                    className={`text-xs font-semibold px-4 py-1 rounded-full ${
                        store?.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : store?.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                    }`}
                >
                    {store?.status || "unknown"}
                </span>
            </div>

            {/* 🔥 DESCRIPTION */}
            <p className="text-slate-600 my-4 max-w-2xl">
                {store?.description || "No description provided"}
            </p>

            {/* 🔥 DETAILS */}
            <p className="flex items-center gap-2">
                <MapPin size={16} />
                {store?.address || "No address"}
            </p>

            <p className="flex items-center gap-2">
                <Phone size={16} />
                {store?.contact || "No contact"}
            </p>

            <p className="flex items-center gap-2">
                <Mail size={16} />
                {store?.email || "No email"}
            </p>

            {/* 🔥 CREATED DATE */}
            <p className="text-slate-700 mt-5">
                Applied on{" "}
                <span className="text-xs">
                    {store?.createdAt
                        ? new Date(store.createdAt).toLocaleDateString()
                        : "N/A"}
                </span>{" "}
                by
            </p>

            {/* 🔥 USER INFO (FIXED IMAGE ERROR HERE) */}
            <div className="flex items-center gap-3 text-sm">

                {/* SAFE IMAGE */}
                <Image
                    width={36}
                    height={36}
                    src={store?.user?.image || defaultUserImage}
                    alt={store?.user?.name || "user"}
                    className="w-9 h-9 rounded-full object-cover"
                />

                <div>
                    <p className="text-slate-600 font-medium">
                        {store?.user?.name || "Unknown User"}
                    </p>

                    <p className="text-slate-400">
                        {store?.user?.email || "No email"}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default StoreInfo