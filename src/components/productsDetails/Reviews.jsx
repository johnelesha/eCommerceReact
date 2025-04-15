import { React, useContext, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import { UsersContext } from "../../context/UserContext";
import useTheme from "../../hooks/useTheme";

const Reviews = ({ product }) => {
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  const { users, currentUser } = useContext(UsersContext);
  const userId = currentUser?.id || localStorage.getItem("userId");

  const theme = useTheme();
  useEffect(() => {
    if (product) {
      setReviews(product.reviews || []);
    }
  }, [product]);

  if (!product) return <div>Product not found!</div>;
  const textColor = theme == "night" ? "text-gray-100" : "text-sky-950";

  const handleAdd = async () => {
    if (!userId) {
      setShowLoginWarning(true);
      setShowEmptyWarning(false);
      return;
    }

    if (comment.trim() === "") {
      setShowEmptyWarning(true);
      setShowLoginWarning(false);
      return;
    }

    const newReview = {
      userId: userId,
      review: comment,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setComment("");
    setShowLoginWarning(false);
    setShowEmptyWarning(false);

    try {
      await axios.patch(`http://localhost:3000/products/${product.id}`, {
        reviews: updatedReviews,
      });
    } catch (error) {
      console.error("Error updating reviews:", error);
    }
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center">
          <h3 className={`text-xl font-bold ${textColor} mb-4`}>Reviews</h3>
          <div className="grid place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {reviews.map((rev, index) => (
              <div key={index} className="flex gap-3 items-center">
                {(() => {
                  const user = users.find((u) => u.id === rev.userId);
                  return user?.image ? (
                    <img
                      src={user.image}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaRegUserCircle className="text-2xl text-gray-600" />
                  );
                })()}
                <div className="chat chat-start flex items-center">
                  <div className="chat-bubble text-sm">{rev.review}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center mt-10">
          <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
              Add a Review
            </h3>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your Comment..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-sky-950 text-white rounded-md hover:bg-sky-800 transition"
              >
                Add
              </button>
            </div>
            {showLoginWarning && (
              <p className="text-sm text-red-600 mt-3 text-center">
                Please log in to add a review.
              </p>
            )}
            {showEmptyWarning && (
              <p className="text-sm text-red-600 mt-1 text-center">
                Comment cannot be empty.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
