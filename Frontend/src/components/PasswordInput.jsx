import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-[#0F1629] border border-gray-700 rounded-lg text-white"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-3 text-cyan-400"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}