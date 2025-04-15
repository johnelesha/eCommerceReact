import { createContext, useState, useEffect } from "react";

export const CartProvider = createContext();

const CartContext = ({ children }) => {
    const [cart, setCart] = useState({});

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
            } catch (error) {
                console.error("Error parsing saved cart:", error);
                setCart({});
            }
        }
    }, []);

    useEffect(() => {
        if (Object.keys(cart).length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.setItem("cart", "");
        }
    }, [cart]);

    const addToCart = (productId, productPrice) => {
        setCart(prev => {
            const current = prev[productId] || { quantity: 0, total: 0 };
            const newQuantity = current.quantity + 1;
            return {
                ...prev,
                [productId]: {
                    quantity: newQuantity,
                    total: newQuantity * productPrice,
                },
            };
        });
    };

    const removeFromCart = (productId, productPrice) => {
        setCart(prev => {
            const current = prev[productId];
            if (!current) return prev;

            const newQuantity = current.quantity - 1;
            if (newQuantity <= 0) {
                const updated = { ...prev };
                delete updated[productId];
                return updated;
            }

            return {
                ...prev,
                [productId]: {
                    quantity: newQuantity,
                    total: newQuantity * productPrice,
                },
            };
        });
    };

    return (
        <CartProvider.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartProvider.Provider>
    );
};

export default CartContext;