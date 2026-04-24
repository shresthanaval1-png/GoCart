'use client'
import { assets } from "@/assets/assets"
import { useEffect, useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import Loading from "@/components/Loading"
import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function CreateStore() {

    const { user } = useUser()
    const router = useRouter()
    const { getToken } = useAuth()

    const [alreadySubmitted, setAlreadySubmitted] = useState(false)
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    const [storeInfo, setStoreInfo] = useState({
        name: "",
        username: "",
        description: "",
        email: "",
        contact: "",
        address: "",
        image: ""
    })

    const onChangeHandler = (e) => {
        setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value })
    }

    const fetchSellerStatus = async () => {
        try {
            const token = await getToken()

            const { data } = await axios.get('/api/store/create', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (['APPROVED', 'REJECTED', 'PENDING'].includes(data.status)) {
                setStatus(data.status)
                setAlreadySubmitted(true)

                switch (data.status) {
                    case "APPROVED":
                        setMessage("Your store has been approved. Redirecting to your dashboard...")
                        break
                    case "REJECTED":
                        setMessage("Your store request has been rejected, contact the admin for more details")
                        break
                    case "PENDING":
                        setMessage("Your store request is pending, please wait for admin to approve your store")
                        break
                }
            } else {
                setAlreadySubmitted(false)
            }

        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        } finally {
            setLoading(false)
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (!user) {
            return toast('Please login to continue')
        }

        try {
            const token = await getToken()
            const formData = new FormData()

            formData.append("name", storeInfo.name)
            formData.append("description", storeInfo.description)
            formData.append("username", storeInfo.username)
            formData.append("email", storeInfo.email)
            formData.append("contact", storeInfo.contact)
            formData.append("address", storeInfo.address)
            formData.append("image", storeInfo.image)

            await toast.promise(
                axios.post('/api/store/create', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                {
                    loading: "Submitting data...",
                    success: "Store submitted successfully!",
                    error: "Submission failed"
                }
            )

            await fetchSellerStatus()

        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchSellerStatus()
        } else {
            setLoading(false)
        }
    }, [user])

    // ✅ FINAL SIMPLE REDIRECT (ONLY PLACE)
    useEffect(() => {
        if (!loading && status === "APPROVED") {
            router.replace("/store")
        }
    }, [status, loading, router])

    if (!user) {
        return (
            <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
                <h1 className="text-2xl sm:text-4xl font-semibold">
                    Please <span className="text-slate-500">Login</span> to continue
                </h1>
            </div>
        )
    }

    return !loading ? (
        <>
            {!alreadySubmitted ? (
                <div className="mx-6 min-h-[70vh] my-16">
                    <form
                        onSubmit={onSubmitHandler}
                        className="max-w-7xl mx-auto flex flex-col items-start gap-3 text-slate-500"
                    >

                        <div>
                            <h1 className="text-3xl">
                                Add Your <span className="text-slate-800 font-medium">Store</span>
                            </h1>
                            <p className="max-w-lg">
                                To become a seller on GoCart, submit your store details for review.
                            </p>
                        </div>

                        <label className="mt-10 cursor-pointer">
                            Store Logo
                            <Image
                                src={storeInfo.image ? URL.createObjectURL(storeInfo.image) : assets.upload_area}
                                className="rounded-lg mt-2 h-16 w-auto"
                                alt=""
                                width={150}
                                height={100}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setStoreInfo({ ...storeInfo, image: e.target.files[0] })}
                                hidden
                            />
                        </label>

                        <p>Username</p>
                        <input name="username" onChange={onChangeHandler} value={storeInfo.username} className="input" />

                        <p>Name</p>
                        <input name="name" onChange={onChangeHandler} value={storeInfo.name} className="input" />

                        <p>Description</p>
                        <textarea name="description" onChange={onChangeHandler} value={storeInfo.description} rows={5} className="input" />

                        <p>Email</p>
                        <input name="email" onChange={onChangeHandler} value={storeInfo.email} type="email" className="input" />

                        <p>Contact Number</p>
                        <input name="contact" onChange={onChangeHandler} value={storeInfo.contact} className="input" />

                        <p>Address</p>
                        <textarea name="address" onChange={onChangeHandler} value={storeInfo.address} rows={5} className="input" />

                        <button type="submit" className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40">
                            Submit
                        </button>

                    </form>
                </div>
            ) : (
                <div className="min-h-[80vh] flex flex-col items-center justify-center">
                    <p className="sm:text-2xl lg:text-3xl mx-5 font-semibold text-slate-500 text-center max-w-2xl">
                        {message}
                    </p>
                </div>
            )}
        </>
    ) : (<Loading />)
}