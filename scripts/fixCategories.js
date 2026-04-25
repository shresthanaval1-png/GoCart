const prisma = require("../lib/prisma").default;

// ✅ NORMALIZE FUNCTION
const normalize = (cat) => {
  if (!cat) return "";

  const c = cat.toLowerCase().trim();

  if (["speaker", "speakers"].includes(c)) return "speakers";

  if (["sport", "sports", "sports & outdoors"].includes(c))
    return "sports & outdoors";

  if (["toy", "toys", "toys and games", "toys & games"].includes(c))
    return "toys & games";

  if (c === "watch") return "watch";
  if (c === "decoration") return "decoration";

  return c;
};

async function fixCategories() {
  const products = await prisma.product.findMany();

  for (const product of products) {

    // ✅ normalize single category
    const newCategory = normalize(product.category);

    // ✅ normalize categories array
    let newCategories = [];

    if (product.categories && product.categories.length > 0) {
      newCategories = product.categories.map(c => normalize(c));
    } else if (product.category) {
      newCategories = [newCategory];
    }

    await prisma.product.update({
      where: { id: product.id },
      data: {
        category: newCategory,
        categories: newCategories,
      },
    });

    console.log(`Updated: ${product.category} → ${newCategory}`);
  }

  console.log("✅ Categories fixed successfully");
  process.exit(0);
}

fixCategories();