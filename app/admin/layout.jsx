import AdminLayout from "@/components/admin/AdminLayout"
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs"

export const metadata = {
    title: "GoCart Admin Dashboard",
    description: "Manage stores, coupons and approvals",
}

export default function RootAdminLayout({ children }) {

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ✅ WHEN USER IS LOGGED IN */}
            <SignedIn>
                <AdminLayout>
                    <div className="p-4 sm:p-6">
                        {children}
                    </div>
                </AdminLayout>
            </SignedIn>

            {/* ❌ WHEN USER IS NOT LOGGED IN */}
            <SignedOut>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">

                    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">

                        <h1 className="text-2xl font-bold text-center mb-4 text-green-600">
                            GoCart Admin
                        </h1>

                        <p className="text-center text-gray-500 mb-6 text-sm">
                            Sign in to manage your platform
                        </p>

                        <SignIn
                            fallbackRedirectUrl="/admin"
                            routing="hash"
                        />

                    </div>

                </div>
            </SignedOut>

        </div>
    )
}