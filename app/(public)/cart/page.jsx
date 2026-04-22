'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    
    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);

    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]); // ✅ NEW
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        let total = 0;
        const temp = [];

        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === key);
            if (product) {
                temp.push({
                    ...product,
                    quantity: value,
                });

                // ✅ ONLY COUNT SELECTED ITEMS
                if (selectedItems.includes(key)) {
                    total += product.price * value;
                }
            }
        }

        setCartArray(temp);
        setTotalPrice(total);
    }

    const handleDeleteItemFromCart = (productId) => {
        dispatch(deleteItemFromCart({ productId }))
        setSelectedItems(prev => prev.filter(id => id !== productId))
    }

    // ✅ TOGGLE SINGLE
    const toggleSelect = (id) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        )
    }

    // ✅ SELECT ALL
    const toggleSelectAll = () => {
        if (selectedItems.length === cartArray.length) {
            setSelectedItems([])
        } else {
            setSelectedItems(cartArray.map(item => item.id))
        }
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products, selectedItems]);

    return cartArray.length > 0 ? (
        <div className="min-h-screen mx-6 text-slate-800">

            <div className="max-w-7xl mx-auto ">

                <PageTitle heading="My Cart" text="items in your cart" linkText="Add more" />

                {/* ✅ SELECT ALL */}
                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        checked={selectedItems.length === cartArray.length}
                        onChange={toggleSelectAll}
                    />
                    <span>Select All</span>
                </div>

                <div className="flex items-start justify-between gap-5 max-lg:flex-col">

                    <table className="w-full max-w-4xl text-slate-600 table-auto">
                        <thead>
                            <tr className="max-sm:text-sm">
                                <th></th>
                                <th className="text-left">Product</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th className="max-md:hidden">Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                cartArray.map((item, index) => (
                                    <tr key={index}>

                                        {/* ✅ CHECKBOX */}
                                        <td className="text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => toggleSelect(item.id)}
                                            />
                                        </td>

                                        <td className="flex gap-3 my-4">
                                            <div className="flex items-center justify-center bg-slate-100 size-18 rounded-md">
                                                <Image src={item.images[0]} className="h-14 w-auto" alt="" width={45} height={45} />
                                            </div>
                                            <div>
                                                <p className="max-sm:text-sm">{item.name}</p>
                                                <p className="text-xs text-slate-500">{item.category}</p>
                                                <p>{currency}{item.price}</p>
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            <Counter productId={item.id} />
                                        </td>

                                        <td className="text-center">
                                            {currency}{(item.price * item.quantity).toLocaleString()}
                                        </td>

                                        <td className="text-center max-md:hidden">
                                            <button
                                                onClick={() => handleDeleteItemFromCart(item.id)}
                                                className="text-red-500 hover:bg-red-50 p-2.5 rounded-full"
                                            >
                                                <Trash2Icon size={18} />
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    {/* ✅ ONLY SELECTED ITEMS PASS */}
                    <OrderSummary
                        totalPrice={totalPrice}
                        items={cartArray.filter(item => selectedItems.includes(item.id))}
                    />

                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
            <h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
        </div>
    )
}