"use client"

import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "@/lib/features/product/productSlice";
import { fetchCart, uploadCart } from "@/lib/features/cart/cartSlice";
import { fetchAddress } from "@/lib/features/address/addressSlice";
import { fetchUserRatings } from "@/lib/features/rating/ratingSlice";

import { useUser, useAuth } from "@clerk/nextjs";

export default function PublicLayout({ children }) {

    const dispatch = useDispatch()
    const { user } = useUser()
    const { getToken } = useAuth()

    const { cartItems } = useSelector((state) => state.cart)

    // ✅ Fetch products on load
    useEffect(() => {
        dispatch(fetchProducts({}))
    }, [dispatch])

    // ✅ AUTO CREATE USER (no UI change)
    useEffect(() => {
        if (user) {
            fetch("/api/user")
        }
    }, [user])

    // ✅ Fetch user related data
    useEffect(() => {
        if (user) {
            dispatch(fetchCart({ getToken }))
            dispatch(fetchAddress({ getToken }))
            dispatch(fetchUserRatings({ getToken }))
        }
    }, [user, dispatch, getToken])

    // ✅ Sync cart
    useEffect(() => {
        if (user) {
            dispatch(uploadCart({ getToken }))
        }
    }, [cartItems, user, dispatch, getToken])

    return (
        <>
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}