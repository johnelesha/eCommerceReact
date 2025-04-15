import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AverageProvider } from "../../context/AverageContext";
import useTheme from "../../hooks/useTheme";

const FavoriteProductCard = ({ userId }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { averageRates, updateAverage } = useContext(AverageProvider);
  const theme = useTheme();
  const textColor = theme == "night" ? "text-gray-100" : "text-sky-950";
  const titleColor = theme == "night" ? "text-gray-300" : "text-gray-500";
  const bgColor = theme == "winter" ? "bg-gray-200" : "bg-sky-950";

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userRes = await axios.get(`http://localhost:3000/users/${userId}`);
        const wishlistIds = userRes.data.wishlist || [];

        const productsRes = await axios.get(`http://localhost:3000/products`);
        const allProducts = productsRes.data;

        const favs = allProducts.filter(product => wishlistIds.includes(product.id));


        favs.forEach(product => {
          updateAverage(product.id, product.rates);
        });

        setFavoriteProducts(favs);
      } catch (err) {
        console.error("Error fetching favorite products:", err);
      }
    };

    fetchFavorites();
  }, [userId, updateAverage]);

  return (
    <div className="mt-10 container mx-auto px-4 py-8">
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Your Favorite Products ❤️</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {favoriteProducts.map(product => {
          const averageRating = averageRates[product.id] || 0;

          return (
            <div
              key={product.id}
              className={`flex ${bgColor} rounded-xl shadow-md overflow-hidden`}
            >
              <div className="w-1/3 bg-white p-3 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="object-contain h-32 w-32" />
              </div>
              <div className="w-2/3 p-4 text-gray-800 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${textColor}`}>{product.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <span className="text-lg">⭐ {averageRating}</span>
                  </div>
                </div>
                <p className={`text-sm ${titleColor}`}>{product.description}</p>
                <p className={`font-semibold ${textColor}`}>${product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteProductCard;
