import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartProvider } from "../../Context/CartContext";
import CartControls from "../sharedComponent/CartControls";
import { ProdContext } from "../../Context/ProductContext";

const CartPage = () => {
  const { cart } = useContext(CartProvider);
  const { products } = useContext(ProdContext);
  const navigate = useNavigate();

  const getProductDetails = (productId) => {
    return (
      products.find((product) => product.id === productId) || {
        name: `Product ${productId}`,
        image: "/placeholder-image.jpg",
        price: 0,
      }
    );
  };

  const grandTotal = Object.values(cart).reduce(
    (total, item) => total + item.total,
    0
  );

  return (
    <div className="mx-12 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {Object.keys(cart).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {Object.entries(cart).map(([productId, item]) => {
              const product = getProductDetails(productId);
              return (
                <div
                  key={productId}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg shadow-sm"
                >
                  <div className="flex items-center mb-4 sm:mb-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-contain mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-gray-600">
                        ${product.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <CartControls
                      productId={productId}
                      productPrice={product.price}
                      maxQuantity={product.quantity}
                    />
                    <p className="font-semibold text-lg">
                      ${(product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-12 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Grand Total</h2>
              <p className="text-2xl font-bold">${grandTotal.toFixed(2)}</p>
            </div>
            <button onClick={() => navigate('/checkout')} className="w-full cursor-pointer mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
              Proceed to Checkout
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
