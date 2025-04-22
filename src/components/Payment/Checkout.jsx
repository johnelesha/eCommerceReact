import React, { useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UserContext";
import { CartProvider } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";
import { ProdContext } from "../../context/ProductContext";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UsersContext);
  const { cart } = useContext(CartProvider);
  const { createOrders } = useContext(OrderContext);
  const { products } = useContext(ProdContext);

  React.useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const totalAmount = Object.values(cart).reduce(
    (sum, item) => sum + item.total,
    0
  );

  const prepareOrderData = () => {
    const products = Object.keys(cart).map((productId) => ({
      productId,
      quantity: cart[productId].quantity,
    }));

    const orderData = {
      userId: currentUser?.id,
      date: new Date().toISOString().split("T")[0],
      totalAmount,
      products,
      status: "pending",
    };

    return orderData;
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 space-y-6 text-gray-900">
        <h1 className="text-2xl font-bold text-center">Payment Page</h1>

        <div className="border p-4 rounded-xl space-y-4 bg-gray-50">
          <p className="text-lg font-semibold">Order Summary</p>

          {Object.entries(cart).map(([productId, item]) => {
            const product = products.find((p) => p.id === productId);

            return (
              <div
                key={productId}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center space-x-4">
                  {product?.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium">
                      {product?.name || `Product ${productId}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product?.category} | Quantity ({item.quantity})
                    </p>

                  </div>
                </div>
                <span className="font-medium">${item.total.toFixed(2)}</span>
              </div>
            );
          })}

          <div className="pt-2 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span>Shipping</span>
              <span className="text-green-700 font-semibold">Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <PayPalScriptProvider
          options={{
            "client-id":
              "AdomIwExA3GK4unJjKHpvw3k9axAFDPiN9vzWppIWhHI9Mt8T7icRtANq-uSRu3ByQ3arVdfDrlGqkPh",
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalAmount.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              try {
                await actions.order.capture();
                const orderData = prepareOrderData();
                await createOrders(orderData);
                alert("Transaction completed successfully!");
                navigate("/");
              } catch (error) {
                console.error("Payment error:", error);
                alert("Payment failed. Please try again.");
              }
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default PaymentPage;
