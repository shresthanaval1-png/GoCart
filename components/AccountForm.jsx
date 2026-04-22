'use client'

import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "@/lib/features/user/userSlice"
import { useState } from "react"

export default function AccountForm() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [name, setName] = useState(user.name)
  const [age, setAge] = useState(user.age)
  const [gender, setGender] = useState(user.gender)

  const handleSave = () => {
    dispatch(setUserInfo({ name, age, gender }))
    alert("Saved!")
  }

  return (
    <div className="space-y-4 max-w-md">

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Age"
        value={age}
        onChange={e => setAge(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <select
        value={gender}
        onChange={e => setGender(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save
      </button>

    </div>
  )
}