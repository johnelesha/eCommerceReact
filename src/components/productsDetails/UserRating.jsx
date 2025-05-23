import { useContext, useState, useEffect } from "react";
import { UsersContext } from "../../context/UserContext";
import axios from "axios";

const UserRating = ({ productId, productRates, setProductRates, onRateUpdate }) => {
    const { currentUser, setCurrentUser } = useContext(UsersContext);
    const [userRate, setUserRate] = useState(0);
    const [message, setMessage] = useState("");
    const userId = currentUser?.id || localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) return;
        const ratedProduct = currentUser?.ratedProducts?.find(p => p.productId === productId);
        if (ratedProduct) setUserRate(ratedProduct.rate);
    }, [currentUser, productId, userId]);

    const handleRate = async (rateValue) => {
        if (!userId) {
            setMessage("Please log in to rate.");
            return;
        }

        if (rateValue === userRate) return;

        const updatedRatedProducts = [...(currentUser?.ratedProducts || [])];
        const productIndex = updatedRatedProducts.findIndex(p => p.productId === productId);

        if (productIndex > -1) {
            updatedRatedProducts[productIndex].rate = rateValue;
        } else {
            updatedRatedProducts.push({ productId, rate: rateValue });
        }

        const updatedRates = productRates.map(rate => {
            if (rate.userId === userId) {
                return { ...rate, rated: rateValue };
            }
            return rate;
        });

        if (!updatedRates.some(rate => rate.userId === userId)) {
            updatedRates.push({ userId, rated: rateValue });
        }

        setProductRates(updatedRates);
        onRateUpdate(updatedRates);

        try {
            await Promise.all([
                axios.patch(`https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/users/${userId}`, {
                    ratedProducts: updatedRatedProducts,
                }),
                axios.patch(`https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/products/${productId}`, {
                    rates: updatedRates,
                }),
            ]);

            setCurrentUser(prev => ({ ...prev, ratedProducts: updatedRatedProducts }));
            setUserRate(rateValue);
            setMessage("");
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    return (
        <>
            <div className="rating rating-sm rating-half">
                {Array.from({ length: 10 }, (_, i) => {
                    const starValue = (i + 1) / 2;
                    const isFilled = userRate >= starValue;
                    return (
                        <input
                            key={i}
                            type="radio"
                            name="user-rating"
                            className={`mask mask-star-2 ${i % 2 === 0 ? "mask-half-1" : "mask-half-2"} ${isFilled ? "bg-yellow-400" : "bg-gray-400"}`}
                            onClick={() => handleRate(starValue)}
                            aria-label={`${starValue} stars`}
                        />
                    );
                })}
            </div>
            {message && <p className="text-sm text-red-500">{message}</p>}
        </>
    );
};

export default UserRating;
