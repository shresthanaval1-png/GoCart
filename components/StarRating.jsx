import { useState } from "react"

const labels = ["Terrible 😡", "Bad 😕", "Okay 😐", "Good 🙂", "Excellent 🤩"]

export default function StarRating({ value = 0, onChange }) {

  const [hover, setHover] = useState(0)
  const [clicked, setClicked] = useState(0)

  const displayValue = hover || value

  const handleClick = (star, e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const isHalf = e.clientX - rect.left < rect.width / 2
    const finalValue = isHalf ? star - 0.5 : star

    setClicked(star)
    setTimeout(() => setClicked(0), 200)

    onChange && onChange(finalValue)
  }

  return (
    <div className="flex flex-col gap-2">

      {/* ⭐ STARS + VALUE */}
      <div className="flex items-center gap-3">

        {/* ⭐ STARS */}
        <div className="flex gap-2 text-4xl md:text-5xl">

          {[1, 2, 3, 4, 5].map((star) => {

            const isFull = star <= displayValue
            const isHalf = displayValue >= star - 0.5 && displayValue < star

            return (
              <span
                key={star}
                onClick={(e) => handleClick(star, e)}
                onMouseMove={(e) => handleClick(star, e)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                title={labels[star - 1]}
                className={`
                  relative cursor-pointer transition-all duration-200 ease-out
                  ${isFull ? "text-yellow-400" : "text-gray-300"}
                  ${hover >= star ? "drop-shadow-lg" : ""}
                  ${clicked === star ? "scale-125" : ""}
                `}
              >

                {/* BASE */}
                <span className="opacity-20">★</span>

                {/* FULL */}
                {isFull && (
                  <span className="absolute inset-0 text-yellow-400">
                    ★
                  </span>
                )}

                {/* HALF */}
                {isHalf && (
                  <span className="absolute inset-0 w-1/2 overflow-hidden text-yellow-400">
                    ★
                  </span>
                )}

              </span>
            )
          })}

        </div>

        {/* ⭐ VALUE (Flipkart style) */}
        <div className="text-sm font-medium bg-green-600 text-white px-2 py-1 rounded-md">
          {displayValue.toFixed(1)} / 5
        </div>

      </div>

      {/* 😎 EMOJI FEEDBACK */}
      <div className="text-sm text-gray-600 h-5">
        {displayValue > 0 && labels[Math.ceil(displayValue) - 1]}
      </div>

    </div>
  )
}