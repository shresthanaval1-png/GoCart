import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <div className="text-sm text-slate-500 mb-4 flex items-center gap-2 flex-wrap">

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">

          {/* separator */}
          {index !== 0 && <span className="text-slate-400">/</span>}

          {/* last item = active */}
          {index === items.length - 1 ? (
            <span className="text-slate-700 font-medium">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-green-600 transition"
            >
              {item.label}
            </Link>
          )}

        </span>
      ))}

    </div>
  );
}