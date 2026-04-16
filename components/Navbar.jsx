'use client'
import { PackageIcon, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser, useClerk, UserButton, Protect, useAuth } from "@clerk/nextjs";
import axios from "axios";

const Navbar = () => {

    const { user } = useUser()
    const { openSignIn } = useClerk()
    const { getToken } = useAuth()
    const router = useRouter();

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)

    const [isSeller, setIsSeller] = useState(false)

    useEffect(() => {
        const checkSeller = async () => {
            if (!user) return

            try {
                const token = await getToken()

                const { data } = await axios.get('/api/store/create', {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (data.status === "approved") {
                    setIsSeller(true)
                }

            } catch (error) {
                console.log(error)
            }
        }

        checkSeller()
    }, [user])

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4">

                    {/* LOGO */}
                    <Link href="/" className="text-4xl font-semibold text-slate-700">
                        <span className="text-green-600">go</span>cart
                        <span className="text-green-600 text-5xl">.</span>
                    </Link>

                    {/* MENU */}
                    <div className="hidden sm:flex items-center gap-6 text-slate-600">

                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/about">About</Link>

                        {/* ✅ FIXED CONTACT */}
                        <Link href="/contact">Contact</Link>

                        {/* SEARCH */}
                        <form onSubmit={handleSearch} className="hidden xl:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search products"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-transparent outline-none"
                                required
                            />
                        </form>

                        {/* CART */}
                        <Link href="/cart" className="relative flex items-center gap-2">
                            <ShoppingCart size={18} />
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-1 left-3 text-[10px] text-white bg-slate-600 w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* SELLER */}
                        {isSeller && (
                            <button
                                onClick={() => router.push('/store')}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                            >
                                Dashboard
                            </button>
                        )}

                        {/* AUTH */}
                        {!user ? (
                            <button
                                onClick={openSignIn}
                                className="px-5 py-2 bg-indigo-500 text-white rounded-full"
                            >
                                Login
                            </button>
                        ) : (
                            <UserButton />
                        )}

                    </div>

                    {/* MOBILE */}
                    <div className="sm:hidden">
                        {!user ? (
                            <button
                                onClick={openSignIn}
                                className="px-4 py-1 bg-indigo-500 text-white rounded-full text-sm"
                            >
                                Login
                            </button>
                        ) : (
                            <UserButton />
                        )}
                    </div>

                </div>
            </div>

            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar