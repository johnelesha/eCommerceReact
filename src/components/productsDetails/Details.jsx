import { useContext, React, useState, useEffect } from "react";
import WishlistButton from "../sharedComponent/WishlistButton";
import AverageRating from "./AverageRating";
import UserRating from "./UserRating";
import { AverageProvider } from "../../context/AverageContext";
import useTheme from "../../hooks/useTheme";

const Details = ({ product, onRateUpdate }) => {
  const { averageRates, updateAverage } = useContext(AverageProvider);
  const [productRates, setProductRates] = useState([]);

  const theme = useTheme();
  const textColor = theme == "night" ? "text-gray-100" : "text-sky-950";
  const titleColor = theme == "night" ? "text-gray-300" : "text-gray-500";

  useEffect(() => {
    if (product) {
      setProductRates(product.rates);
      updateAverage(product.id, product.rates);
    }
  }, [product, product.rates, updateAverage]);

  const averageRating = averageRates[product.id] || 0;

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="grid gap-6 p-0 sm:grid-cols-1 md:grid-cols-2 text-left max-w-5xl w-full px-6">
          <img src={product.image} alt={product.name} className="max-w-sm max-h-96 object-cover rounded-lg shadow-md" />
          <div className="my-auto">
            <h1 className={`text-3xl font-bold ${textColor}`}>{product.name}</h1>
            <p className={`mt-2 ${titleColor}`}>{product.description}</p>

            <div className="mt-3">
              <AverageRating averageRating={averageRating} />
            </div>

            <div className="mt-4">
              <p className={`text-md ${textColor} mb-1 font-bold`}>Your Rate</p>
              <UserRating
                productId={product.id}
                productRates={productRates}
                setProductRates={setProductRates}
                onRateUpdate={onRateUpdate}
              />
            </div>

            <div className="mt-1">
              <span className="text-xl">$</span>
              <span className={`font-bold text-xl ${textColor} ml-2`}>{product.price}</span>
            </div>
            <div className="py-5">
              <WishlistButton productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
