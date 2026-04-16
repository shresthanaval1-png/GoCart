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

    // ✅ SELLER STATE
    const [isSeller, setIsSeller] = useState(false)

    // ✅ CHECK SELLER STATUS
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
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4">

                    {/* LOGO */}
                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <span className="text-green-600">go</span>cart
                        <span className="text-green-600 text-5xl leading-0">.</span>

                        <Protect plan='plus'>
                            <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 py-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                                plus
                            </p>
                        </Protect>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">

                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>

                        {/* ✅ FIXED ABOUT */}
                        <Link href="/about">About</Link>

                        {/* ✅ BETTER CONTACT (scroll to footer) */}
                        <a href="#footer">Contact</a>

                        {/* SEARCH */}
                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} />
                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-600"
                                type="text"
                                placeholder="Search products"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                        </form>

                        {/* CART */}
                        <Link href="/cart" className="relative flex items-center gap-2">
                            <ShoppingCart size={18} />
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* SELLER BUTTON */}
                        {isSeller && (
                            <button
                                onClick={() => router.push('/store')}
                                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
                            >
                                Seller Dashboard
                            </button>
                        )}

                        {/* AUTH */}
                        {!user ? (
                            <button
                                onClick={openSignIn}
                                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition"
                            >
                                Login
                            </button>
                        ) : (
                            <UserButton>
                                <UserButton.MenuItems>
                                    <UserButton.Action
                                        labelIcon={<PackageIcon size={16} />}
                                        label="My Orders"
                                        onClick={() => router.push('/orders')}
                                    />
                                </UserButton.MenuItems>
                            </UserButton>
                        )}

                    </div>

                    {/* MOBILE */}
                    <div className="sm:hidden">
                        {!user ? (
                            <button
                                onClick={openSignIn}
                                className="px-5 py-1.5 bg-indigo-500 text-white rounded-full text-sm"
                            >
                                Login
                            </button>
                        ) : (
                            <div className="flex flex-col items-end gap-2">

                                {isSeller && (
                                    <button
                                        onClick={() => router.push('/store')}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                                    >
                                        Seller
                                    </button>
                                )}

                                <UserButton />
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* ✅ IMPORTANT for Contact scroll */}
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar;