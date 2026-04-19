'use client'
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import Loading from "@/components/Loading"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"

export default function StoreManageProducts() {

    const { getToken } = useAuth()
    const { user } = useUser()

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")

    const [editModal, setEditModal] = useState(false)
    const [editData, setEditData] = useState({})

    // ✅ FETCH
    const fetchProducts = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/store/product', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setProducts(data.products)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
        setLoading(false)
    }

    // ✅ DELETE
    const deleteProduct = async (id) => {
        if (!confirm("Delete this product?")) return

        try {
            const token = await getToken()

            await axios.delete(`/api/store/product?id=${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setProducts(prev => prev.filter(p => p.id !== id))
            toast.success("Deleted")
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
    }

    // ✅ UPDATE
    const updateProduct = async () => {
        try {
            const token = await getToken()

            const formData = new FormData()

            formData.append("id", editData.id)
            formData.append("name", editData.name)
            formData.append("description", editData.description)
            formData.append("price", editData.price)
            formData.append("mrp", editData.mrp)
            formData.append("category", editData.category)

            if (editData.newImage) {
                formData.append("image", editData.newImage)
            }

            await axios.put('/api/store/product', formData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            toast.success("Updated")
            fetchProducts()
            setEditModal(false)

        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
    }

    useEffect(() => {
        if (user) fetchProducts()
    }, [user])

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) return <Loading />

    return (
        <div>

            {/* 🔥 STATS */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <p>Total Products</p>
                    <h2 className="text-xl font-bold">{products.length}</h2>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p>In Stock</p>
                    <h2 className="text-green-600 font-bold">
                        {products.filter(p => p.inStock).length}
                    </h2>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p>Out of Stock</p>
                    <h2 className="text-red-600 font-bold">
                        {products.filter(p => !p.inStock).length}
                    </h2>
                </div>
            </div>

            {/* 🔍 SEARCH */}
            <input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded mb-5 w-80"
            />

            {/* 📦 PRODUCTS */}
            <div className="bg-white rounded shadow">
                {filteredProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center p-4 border-b">

                        {/* LEFT */}
                        <div className="flex gap-4 items-center">
                            <Image src={product.images[0]} width={60} height={60} alt="" />

                            <div>
                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="text-sm text-gray-500">{product.category}</p>

                                {/* BADGES */}
                                <div className="flex gap-2 mt-1">
                                    {product.inStock ? (
                                        <span className="text-xs bg-green-100 px-2 rounded">In Stock</span>
                                    ) : (
                                        <span className="text-xs bg-red-100 px-2 rounded">Out of Stock</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-6">
                            <p className="font-semibold">{currency}{product.price}</p>

                            <button
                                onClick={() => {
                                    setEditData(product)
                                    setEditModal(true)
                                }}
                                className="text-blue-500"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔥 EDIT MODAL */}
            {editModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-[400px]">

                        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

                        <input
                            className="border p-2 w-full mb-3"
                            value={editData.name}
                            onChange={(e)=>setEditData({...editData, name: e.target.value})}
                        />

                        <input
                            className="border p-2 w-full mb-3"
                            value={editData.description}
                            onChange={(e)=>setEditData({...editData, description: e.target.value})}
                        />

                        <input
                            type="number"
                            className="border p-2 w-full mb-3"
                            value={editData.price}
                            onChange={(e)=>setEditData({...editData, price: e.target.value})}
                        />

                        <select
                            className="border p-2 w-full mb-3"
                            value={editData.category}
                            onChange={(e)=>setEditData({...editData, category: e.target.value})}
                        >
                            <option value="speaker">Speaker</option>
                            <option value="watch">Watch</option>
                            <option value="decoration">Decoration</option>
                        </select>

                        {/* IMAGE */}
                        <input
                            type="file"
                            onChange={(e)=>setEditData({...editData, newImage: e.target.files[0]})}
                        />

                        {editData.newImage && (
                            <Image
                                src={URL.createObjectURL(editData.newImage)}
                                width={80}
                                height={80}
                                alt=""
                                className="mt-2"
                            />
                        )}

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={()=>setEditModal(false)}>Cancel</button>
                            <button onClick={updateProduct} className="bg-black text-white px-4 py-2 rounded">
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}