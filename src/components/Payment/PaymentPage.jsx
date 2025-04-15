import React, { useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../Context/UserContext";
import { CartProvider } from "../../Context/CartContext";
import { OrderContext } from "../../Context/OrderContext";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UsersContext);
  const { cart } = useContext(CartProvider);
  const { createOrder } = useContext(OrderContext);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Calculate total amount
  const totalAmount = Object.values(cart).reduce(
    (sum, item) => sum + item.total,
    0
  );

  // Prepare order data
  const prepareOrderData = () => {
    const products = Object.keys(cart).map((productId) => ({
      productId,
      quantity: cart[productId].quantity,
    }));

    return {
      userId: currentUser.id,
      date: new Date().toISOString().split("T")[0],
      totalAmount,
      products,
      status: "pending",
    };
  };

  if (!currentUser) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Payment Page</h1>

        {/* Order Summary */}
        <div className="border p-4 rounded-xl space-y-2 bg-gray-50">
          <p className="text-lg font-semibold">Order Summary</p>
          {Object.entries(cart).map(([productId, item]) => (
            <div key={productId} className="flex justify-between">
              <span>Product {productId}</span>
              <span>${item.total.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* PayPal Integration */}
        <PayPalScriptProvider options={{ "client-id": "AXzQW7N6bPuf43VgewQq3TirwOHI9i8MEqicYgYX3Y1gAMeOqREzcW0nbgnH8dpJ6xeKcvhdiFc5ZuTS" }}>
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
                await createOrder(orderData);
                alert("Transaction completed successfully!");
                navigate("/orders");
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