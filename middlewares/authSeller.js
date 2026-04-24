import prisma from '@/lib/prisma';

const authSeller = async (userId) => {
    try {
        if (!userId) return false;

        // ✅ PRIMARY: exact match
        let store = await prisma.store.findUnique({
            where: { userId }
        });

        // ✅ FALLBACK (handles old/broken data safely)
        if (!store) {
            store = await prisma.store.findFirst({
                where: { userId },
                orderBy: { createdAt: "desc" }
            });
        }

        // ✅ STEP 2: ONLY ADMIN APPROVAL CONTROLS ACCESS
        if (store?.status === "APPROVED") {
            return store.id; // ✅ return storeId (no UI break)
        }

        return false;

    } catch (error) {
        console.error(error);
        return false;
    }
};

export default authSeller;