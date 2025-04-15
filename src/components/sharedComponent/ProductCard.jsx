import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AverageProvider } from "../../context/AverageContext";
import CartControls from "./CartControls";
import WishlistButton from "./WishlistButton";
import useTheme from "../../hooks/useTheme";

const ProductCard = ({ product }) => {

    const { averageRates, updateAverage } = useContext(AverageProvider);
    const theme = useTheme();
    const bgCard = theme === "night" ? "bg-neutral" : "bg-gray-50";

    useEffect(() => {
        if (product?.rates) {
            updateAverage(product.id, product.rates);
        }
    }, [product, updateAverage]);
    
    const averageRating = averageRates[product.id] || 0;

    return (
        <>
            <div className={`card relative p-4 ${bgCard} shadow-md rounded-lg h-[430px]`}>
                <Link to={`/products/${product.id}`} className="block">
                    <div className="h-45 w-full">
                        <img className="w-full h-45 object-cover rounded-t-lg" src={product.image} alt={product.name} />
                    </div>
                    <div className="flex flex-col items-start mt-2">

                        <div className="flex justify-between items-center w-full">
                            <h3 className="font-semibold text-xl">{product.name}</h3>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" stroke="currentColor">
                                    <path fillRule="evenodd" d="M10 15l-5.5 3 2-6.5L1 7h6.5L10 0l2.5 7H18l-5.5 4.5 2 6.5L10 15z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-1">{averageRating.toFixed(1)}</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mt-2">{product.description.length > 60 ? `${product.description.slice(0, 60)}...` : product.description}</p>

                        <div className="flex justify-between items-center w-full mt-3">
                            <p className="font-semibold text-lg">{`$${product.price.toFixed(2)}`}</p>
                        </div>
                    </div>
                </Link>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center gap-2">
                    <CartControls
                        productId={product.id}
                        maxQuantity={product.quantity}
                        productPrice={product.price}
                    />

                    <WishlistButton productId={product.id} />
                </div>
            </div>
        </>
    );
};

export default ProductCard;
