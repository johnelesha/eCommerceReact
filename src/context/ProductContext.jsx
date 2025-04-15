import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProdContext = createContext();

const ProductContext = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/products");
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch products", err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProdContext.Provider value={{ products, loading }}>
            {children}
        </ProdContext.Provider>
    );
};

export default ProductContext;
