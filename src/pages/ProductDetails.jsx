import { useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import Details from "../components/productsDetails/Details";
import Reviews from "../components/productsDetails/Reviews";
import { useContext, useEffect, useState } from "react";
import { CartProvider } from "../context/CartContext";
import { ProdContext } from "../context/ProductContext";
import { AverageProvider } from "../context/AverageContext";
import LoadingPage from "../components/sharedComponent/LoadingPage";
import useTheme from "../hooks/useTheme";

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartProvider);
  const { products, loading } = useContext(ProdContext);
  const { updateAverage } = useContext(AverageProvider);

  const [product, setProduct] = useState(null);

  const theme = useTheme();
  const bgColor = theme == "winter" ? "bg-gray-200" : "bg-sky-950";
  const buttonColor = theme == "night" ? "bg-gray-300" : "bg-sky-900";
  const buttonTextColor = theme == "winter" ? "text-gray-200" : "text-sky-900";
  const buttonHoverColor = theme == "night" ? "hover:bg-gray-400" : "hover:bg-sky-950";

  useEffect(() => {
    if (products && productId) {
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct);
    }
  }, [products, productId]);

  if (loading || !productId) {
    return <LoadingPage />;
  }

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    if (product) {
      addToCart(productId, product.price);
    }
  };

  const handleRateUpdate = (newRates) => {
    if (product) {
      updateAverage(product.id, newRates);
    }
  };

  return (
    <>
      <div className={`p-2 py-30 flex flex-col gap-8 justify-center items-center text-center ${bgColor}`}>
        <Details product={product} onRateUpdate={handleRateUpdate} />
        <div className="divider divider-base-content"></div>
        <Reviews product={product} />
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleAddToCart}
          className={`flex items-center gap-2 px-4 py-2 ${buttonColor} ${buttonTextColor} ${buttonHoverColor} rounded-md transition`}>
          <FaCartPlus /> Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
