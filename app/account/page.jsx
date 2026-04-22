'use client'

import { useDispatch } from "react-redux"
import { updateProfile } from "@/lib/features/user/userSlice"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"
import axios from "axios"

export default function AccountPage() {

  const dispatch = useDispatch()
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    image: ""
  })

  // 🔄 LOAD PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/user/profile")

        if (res.data.profile) {
          setForm({
            name: res.data.profile.name || "",
            age: res.data.profile.age || "",
            gender: res.data.profile.gender || "",
            email: res.data.profile.email || "",
            phone: res.data.profile.phone || "",
            address: res.data.profile.address || "",
            image: res.data.profile.image || ""
          })

          dispatch(updateProfile(res.data.profile))
        }

      } catch (err) {
        console.log("Fetch error:", err)
      }
    }

    fetchProfile()
  }, [dispatch])

  // ✏️ HANDLE INPUT
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // 🖼 IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        image: reader.result
      }))
    }
    reader.readAsDataURL(file)
  }

  // 💾 SAVE PROFILE
  const handleSave = async () => {
    try {
      const res = await axios.post("/api/user/profile", form)
      dispatch(updateProfile(res.data.profile))
      alert("Profile saved ✅")
    } catch (err) {
      console.log("Save error:", err)
      alert("Error saving profile")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">

        {/* 🔙 BACK */}
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-black mb-4"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-semibold text-center mb-6">
          My Profile
        </h1>

        {/* 👤 PROFILE IMAGE */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <Image
            src={form.image || "/user.png"}
            alt="profile"
            width={110}
            height={110}
            className="rounded-full object-cover border"
          />
          <input type="file" onChange={handleImageUpload} />
        </div>

        {/* 📝 FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input-style"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="input-style"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input-style"
          />

          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="input-style"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="input-style"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

        </div>

        {/* ADDRESS */}
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Full Address"
          className="input-style mt-4 w-full"
        />

        {/* 💾 SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>

      </div>
    </div>
  )
}