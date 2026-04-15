'use client'
import { useRouter } from "next/navigation";

const CategoriesMarquee = () => {

    const router = useRouter();

    // ✅ CATEGORIES
    const categories = [
        { label: "Headphones", value: "headphones" },
        { label: "Speakers", value: "speakers" },
        { label: "Watch", value: "watch" },
        { label: "Earbuds", value: "earbuds" },
        { label: "Mouse", value: "mouse" },
        { label: "Decoration", value: "decoration" },
        { label: "Toys & Games", value: "toys" },
        { label: "Sports & Outdoors", value: "sports" },
        { label: "Electronics", value: "electronics" },
        { label: "Books", value: "books" },
        { label: "Fashion", value: "fashion" },
        { label: "Beauty", value: "beauty" }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto sm:my-20 px-2">

            {/* LEFT FADE */}
            <div className="relative">
                <div className="absolute left-0 top-0 h-full w-10 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

                {/* ✅ SCROLL CONTAINER */}
                <div className="flex gap-3 overflow-x-auto scrollbar-hide py-3">

                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => router.push(`/shop?category=${cat.value}`)}
                            className="whitespace-nowrap px-5 py-2 bg-slate-100 rounded-full text-slate-600 text-sm hover:bg-green-600 hover:text-white active:scale-95 transition"
                        >
                            {cat.label}
                        </button>
                    ))}

                </div>

                {/* RIGHT FADE */}
                <div className="absolute right-0 top-0 h-full w-10 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>

        </div>
    );
};

export default CategoriesMarquee;