'use client'
import { PackageIcon, Search, ShoppingCart, User, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useUser, useClerk, UserButton, useAuth } from "@clerk/nextjs"
import axios from "axios"

const Navbar = () => {

    const { user } = useUser()
    const { openSignIn } = useClerk()
    const { getToken } = useAuth()
    const router = useRouter()

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)

    // ✅ WISHLIST COUNT
    const wishlistCount = useSelector(state => state.user.wishlist.length)

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

                    {/* DESKTOP */}
                    <div className="hidden sm:flex items-center gap-6 text-slate-700 text-sm font-medium">

                        <Link href="/" className="hover:text-indigo-600">Home</Link>
                        <Link href="/shop" className="hover:text-indigo-600">Shop</Link>
                        <Link href="/about" className="hover:text-indigo-600">About</Link>
                        <Link href="/contact" className="hover:text-indigo-600">Contact</Link>

                        {/* SEARCH */}
                        <form onSubmit={handleSearch} className="hidden xl:flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full">
                            <Search size={16} />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="bg-transparent outline-none"
                            />
                        </form>

                        {/* CART */}
                        <Link href="/cart" className="relative flex items-center gap-1">
                            <ShoppingCart size={18} />
                            <span>Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 text-[10px] bg-indigo-600 text-white w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* ORDERS */}
                        <Link href="/my-orders" className="flex items-center gap-1">
                            <PackageIcon size={18} />
                            <span>My Orders</span>
                        </Link>

                        {/* ❤️ WISHLIST (NEW) */}
                        <Link href="/wishlist" className="relative flex items-center gap-1">
                            <Heart size={18} />
                            <span>Wishlist</span>

                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* ACCOUNT */}
                        <Link href="/account" className="flex items-center gap-1">
                            <User size={18} />
                            <span>Account</span>
                        </Link>

                        {/* SELLER */}
                        {isSeller && (
                            <button
                                onClick={() => router.push('/store')}
                                className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs"
                            >
                                Dashboard
                            </button>
                        )}

                        {/* AUTH */}
                        {!user ? (
                            <button onClick={openSignIn} className="px-4 py-1.5 bg-indigo-500 text-white rounded-lg">
                                Login
                            </button>
                        ) : (
                            <UserButton />
                        )}

                    </div>

                    {/* MOBILE */}
                    <div className="sm:hidden flex items-center gap-3">

                        <Link href="/cart" className="relative">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 text-[10px] bg-indigo-600 text-white w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/my-orders">
                            <PackageIcon size={20} />
                        </Link>

                        {/* ❤️ MOBILE WISHLIST */}
                        <Link href="/wishlist" className="relative">
                            <Heart size={20} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/account">
                            <User size={20} />
                        </Link>

                        {!user ? (
                            <button onClick={openSignIn} className="px-3 py-1 bg-indigo-500 text-white rounded-md">
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