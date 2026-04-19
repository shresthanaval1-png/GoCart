'use client'
import { useSelector } from "react-redux"
import ProductCard from "./ProductCard"

const RelatedProducts = ({ product }) => {

    const products = useSelector(state => state.product.list)

    if (!product) return null

    const related = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 5)

    return (
        <div className="mt-12">

            <h2 className="text-xl font-semibold mb-6">
                Related Products
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">

                {related.length > 0 ? (
                    related.map(item => (
                        <ProductCard key={item.id} product={item} />
                    ))
                ) : (
                    <p className="text-gray-400">No related products</p>
                )}

            </div>

        </div>
    )
}

export default RelatedProducts