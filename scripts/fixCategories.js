const prisma = require("../lib/prisma").default;

async function fixCategories() {
  const products = await prisma.product.findMany();

  for (const product of products) {
    if (!product.categories || product.categories.length === 0) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          categories: [product.category],
        },
      });
    }
  }

  console.log("✅ Categories fixed successfully");
  process.exit(0);
}

fixCategories();