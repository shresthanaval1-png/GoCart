import prisma from "@/lib/prisma"

export async function GET() {
  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
  })

  return Response.json(categories.map(c => c.category))
}