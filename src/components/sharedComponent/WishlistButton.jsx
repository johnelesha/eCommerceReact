import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UserContext";
import axios from "axios";
import useTheme from "../../hooks/useTheme";

const WishlistButton = ({ productId }) => {

    const { currentUser, setCurrentUser } = useContext(UsersContext);
    const navigate = useNavigate();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (currentUser && Array.isArray(currentUser.wishlist)) {
            setIsInWishlist(currentUser.wishlist.includes(productId));
        } else {
            setIsInWishlist(false);
        }
    }, [currentUser, productId]);

    const handleToggle = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            navigate("/login");
            return;
        }

        try {
            const updatedWishlist = isInWishlist
                ? currentUser.wishlist.filter((id) => id !== productId)
                : [...currentUser.wishlist, productId];

            const updatedUser = {
                ...currentUser,
                wishlist: updatedWishlist,
            };

            await axios.patch(`http://localhost:3000/users/${currentUser.id}`, {
                wishlist: updatedWishlist,
            });

            setCurrentUser(updatedUser);
        } catch (err) {
            console.error("Error updating wishlist:", err);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={(e) => handleToggle(e)}
                className="p-2 rounded-full transition-all duration-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${isInWishlist ? "fill-error" : theme === 'night' ? 'fill-gray-200' : 'fill-base-200'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 21l-1-1-7-7C2.77 11.58 2 9.62 2 7.5 
                    2 5.01 4.01 3 6.5 3c1.74 0 3.41.81 4.5 2.09C12 5 
                    14 3 16.5 3 19.01 3 21 5.01 21 7.5c0 2.12-.77 
                    4.08-2 5.5l-7 7-1 1z"
                    />
                </svg>
            </button>
        </>
    );
};

export default WishlistButton;
