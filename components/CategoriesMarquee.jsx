'use client'
import { useRouter } from "next/navigation";
import { useRef } from "react";

const CategoriesMarquee = () => {

    const router = useRouter();
    const scrollRef = useRef(null);

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDown = true;
        scrollRef.current.classList.add("cursor-grabbing");
        startX = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft = scrollRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
        scrollRef.current.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
        isDown = false;
        scrollRef.current.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

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
        <div className="max-w-7xl mx-auto px-6 sm:my-16">

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar cursor-grab"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => router.push(`/shop?category=${cat.value}`)}
                        className="whitespace-nowrap px-5 py-2 bg-slate-100 rounded-lg text-slate-600 text-sm hover:bg-slate-700 hover:text-white transition"
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default CategoriesMarquee;