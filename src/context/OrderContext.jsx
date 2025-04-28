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
                    const response = await axios.get(`https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/orders?userId=${currentUser.id}`);
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
            const response = await axios.post("https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/orders", orderData);
            
            // 2. Update product quantities
            await Promise.all(
                orderData.products.map(async (product) => {
                    // Fetch current product data
                    const productRes = await axios.get(`https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/products/${product.productId}`);
                    const currentQuantity = productRes.data.quantity;
                    
                    // Calculate new quantity
                    const newQuantity = currentQuantity - product.quantity;
                    
                    // Update product with new quantity
                    await axios.patch(`https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/products/${product.productId}`, {
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