import { useState, useContext } from "react";
import { ProdContext } from "../context/ProductContext";
import AllProducts from "../components/products/AllProducts";
import FilterBar from "../components/products/FilterBar";
import ProductsLoading from "../components/products/PorductsLoading";

const Products = () => {
    const { products, loading } = useContext(ProdContext);
    const [filteredType, setFilteredType] = useState("");
    const [filteredCategory, setFilteredCategory] = useState("");
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [searchTerm, setSearchTerm] = useState("");

    // const handleFilterChange = (filterType, filterValue) => {
    //     if (filterType === "type") {
    //         setFilteredType(filterValue);
    //     } else if (filterType === "category") {
    //         setFilteredCategory(filterValue);
    //     } else if (filterType === "priceRange") {
    //         setPriceRange(filterValue);
    //     }
    // };

    const filteredProducts = products.filter(product => {
        const matchesType = filteredType ? product.type === filteredType : true;
        const matchesCategory = filteredCategory ? product.category === filteredCategory : true;
        //return matchesType && matchesCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());

        //return matchesType && matchesCategory && matchesPrice;
        return matchesType && matchesCategory && matchesPrice && matchesName;
    });

    return (
        <>
            <div>
                <FilterBar searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                    onFilterSelect={(type, category) => {
                        setFilteredType(type);
                        setFilteredCategory(category);
                    }}
                    onPriceChange={(range) => setPriceRange(range)} />

                {loading ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductsLoading key={i} />
                        ))}
                    </div>
                ) : (
                    <AllProducts products={filteredProducts} />
                )}
            </div>
        </>
    );
};

export default Products;
