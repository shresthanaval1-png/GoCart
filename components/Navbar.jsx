'use client'
import { PackageIcon, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser, useClerk, UserButton, useAuth } from "@clerk/nextjs";
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
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4">

                <div className="flex items-center justify-between py-4">

                    {/* LOGO */}
                    <Link href="/" className="text-3xl font-bold text-slate-800">
                        <span className="text-indigo-600">go</span>cart
                        <span className="text-indigo-600 text-4xl">.</span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden sm:flex items-center gap-6 text-slate-700 text-sm font-medium">

                        <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
                        <Link href="/shop" className="hover:text-indigo-600 transition">Shop</Link>
                        <Link href="/about" className="hover:text-indigo-600 transition">About</Link>
                        <Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link>

                        {/* SEARCH */}
                        <form
                            onSubmit={handleSearch}
                            className="hidden xl:flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full focus-within:ring-2 focus-within:ring-indigo-400"
                        >
                            <Search size={16} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search products"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-transparent outline-none text-sm"
                                required
                            />
                        </form>

                        {/* 🛒 CART */}
                        <Link href="/cart" className="relative flex items-center gap-1 hover:text-indigo-600 transition">
                            <ShoppingCart size={18} />
                            <span>Cart</span>

                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 text-[10px] text-white bg-indigo-600 w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* 📦 MY ORDERS (NEW) */}
                        <Link href="/my-orders" className="flex items-center gap-1 hover:text-indigo-600 transition">
                            <PackageIcon size={18} />
                            <span>My Orders</span>
                        </Link>

                        {/* SELLER */}
                        {isSeller && (
                            <button
                                onClick={() => router.push('/store')}
                                className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-green-700 transition"
                            >
                                Dashboard
                            </button>
                        )}

                        {/* AUTH */}
                        {!user ? (
                            <button
                                onClick={openSignIn}
                                className="px-4 py-1.5 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition"
                            >
                                Login
                            </button>
                        ) : (
                            <UserButton />
                        )}

                    </div>

                    {/* 📱 MOBILE */}
                    <div className="sm:hidden flex items-center gap-3">

                        {/* CART */}
                        <Link href="/cart" className="relative">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 text-[10px] text-white bg-indigo-600 w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* MY ORDERS */}
                        <Link href="/my-orders">
                            <PackageIcon size={20} />
                        </Link>

                        {!user ? (
                            <button
                                onClick={openSignIn}
                                className="px-3 py-1 bg-indigo-500 text-white rounded-md text-sm"
                            >
                                Login
                            </button>
                        ) : (
                            <UserButton />
                        )}
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar