import Link from "next/link"

export default function Breadcrumb({ items = [] }) {

  // 🔥 format label (headphones → Headphones)
  const formatLabel = (text) => {
    if (!text) return ""
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return (
    <div className="text-sm text-slate-500 mb-4 flex items-center gap-1 flex-wrap">

      {items.map((item, index) => {

        const isLast = index === items.length - 1

        return (
          <span key={index} className="flex items-center gap-1">

            {/* separator */}
            {index !== 0 && (
              <span className="text-slate-300">/</span>
            )}

            {/* last item */}
            {isLast || !item.href ? (
              <span className="text-slate-700 font-medium">
                {formatLabel(item.label)}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-green-600 transition"
              >
                {formatLabel(item.label)}
              </Link>
            )}

          </span>
        )
      })}

    </div>
  )
}