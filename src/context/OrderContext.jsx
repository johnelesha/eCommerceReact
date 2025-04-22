import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { UsersContext } from "./UserContext";
import { CartProvider } from "./CartContext";

export const OrderContext = createContext(null);

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const { currentUser } = useContext(UsersContext);
    const { clearCart } = useContext(CartProvider);

    useEffect(() => {
        if (currentUser?.id) {
            const fetchOrders = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/orders?userId=${currentUser.id}`);
                    setOrders(response.data);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                }
            };
            fetchOrders();
        }
    }, [currentUser]);

    const createOrders = async (orderData) => {
        try {
            // 1. First create the order
            const response = await axios.post("http://localhost:3000/orders", orderData);
            
            // 2. Update product quantities
            await Promise.all(
                orderData.products.map(async (product) => {
                    // Fetch current product data
                    const productRes = await axios.get(`http://localhost:3000/products/${product.productId}`);
                    const currentQuantity = productRes.data.quantity;
                    
                    // Calculate new quantity
                    const newQuantity = currentQuantity - product.quantity;
                    
                    // Update product with new quantity
                    await axios.patch(`http://localhost:3000/products/${product.productId}`, {
                        quantity: newQuantity
                    });
                })
            );
    
            // 3. Clear cart
            // setCart([]);
            // localStorage.removeItem("cart");
            clearCart();
    
            return response.data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    };

    return (
        <OrderContext.Provider value={{ orders, createOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

// Default export the provider
export default OrderProvider;