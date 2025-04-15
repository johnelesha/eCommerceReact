import { useContext } from "react";
import { CartProvider } from "../../context/CartContext";
import useTheme from "../../hooks/useTheme";

const CartControls = ({ productId, productPrice, maxQuantity }) => {
    const { cart, addToCart, removeFromCart } = useContext(CartProvider);
    const quantity = cart[productId]?.quantity || 0;
    const theme = useTheme();
    const bgMinus = theme === "night" ? "bg-gray-100" : "bg-gray-300";

    const handleAdd = () => {
        if (quantity < maxQuantity) {
            addToCart(productId, productPrice);
        }
    };

    const handleRemove = () => {
        removeFromCart(productId, productPrice);
    };

    return (
        <>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleRemove}
                    disabled={quantity === 0}
                    className={`${bgMinus} text-gray-600 py-2 px-5 rounded-full disabled:opacity-50`}
                >
                    -
                </button>
                <span className="mx-2">{quantity}</span>
                <button
                    onClick={handleAdd}
                    disabled={quantity >= maxQuantity}
                    className="bg-blue-500 text-white py-2 px-5 rounded-full"
                >
                    +
                </button>
            </div>
        </>
    );
};

export default CartControls;
