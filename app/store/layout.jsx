import StoreLayout from "@/components/store/StoreLayout";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

export const metadata = {
    title: "GoCart. - Store Dashboard",
    description: "GoCart. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <SignedIn>

                {/* 🔥 TOP BAR ADDED */}
                <div className="flex items-center justify-between px-6 py-3 border-b bg-white">

                    <h1 className="text-lg font-semibold text-slate-700">
                        Seller Panel
                    </h1>

                    {/* 🏠 HOME BUTTON */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-sm transition"
                    >
                        <HomeIcon size={18} />
                        Go to Store
                    </Link>

                </div>

                {/* EXISTING */}
                <StoreLayout>
                    {children}
                </StoreLayout>

            </SignedIn>

            <SignedOut>
                <div className="min-h-screen flex items-center justify-center">
                    <SignIn fallbackRedirectUrl="/store" routing="hash" />
                </div>
            </SignedOut>
        </>
    );
}