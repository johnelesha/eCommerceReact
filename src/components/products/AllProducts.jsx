import ProductCard from "../sharedComponent/ProductCard";

const AllProducts = ({ products }) => {
    if (products.length === 0) {
        return <div>No products found</div>;
    }

    return (
        <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
};

export default AllProducts;
