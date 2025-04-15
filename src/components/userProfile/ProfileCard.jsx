import { useEffect, useState } from "react";
import axios from "axios";
import useTheme from "../../hooks/useTheme";

const ProfileCard = ({ userId, onEdit }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ favorites: 0, comments: 0, ratings: 0 });
  const theme = useTheme();
  const textColor = theme == "night" ? "text-gray-100" : "text-sky-950";
  const titleColor = theme == "night" ? "text-gray-300" : "text-gray-500";
  const borderColor = theme == "night" ? "border-gray-200" : "border-sky-950";
  const bgColor = theme == "winter" ? "bg-gray-200" : "bg-sky-950";
  const buttonColor = theme == "night" ? "bg-gray-300" : "bg-sky-900";
  const buttonTextColor = theme == "winter" ? "text-gray-200" : "text-sky-900";
  const buttonHoverColor = theme == "night" ? "hover:bg-gray-400" : "hover:bg-sky-950";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:3000/users/${userId}`);
        setUser(userRes.data);

        const productsRes = await axios.get("http://localhost:3000/products");
        const products = productsRes.data;

        const favorites = userRes.data.wishlist.length;

        const comments = products.filter((p) =>
          p.reviews.some((r) => r.userId === userId)
        ).length;

        const ratings = products.filter((p) =>
          p.rates.some((r) => r.userId === userId)
        ).length;

        setStats({ favorites, comments, ratings });
      } catch (err) {
        console.error("Error fetching user or products", err);
      }
    };

    fetchData();
  }, [userId]);

  if (!user) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className={`${bgColor} shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 w-full max-w-5xl mx-auto mt-10`}>
      <div className="relative w-32 h-32">
        <img src={user.image} alt="User" className={`rounded-full w-full h-full object-cover border-2 ${borderColor}`} />
      </div>
      <div className="flex-1">
        <h2 className={`text-2xl font-bold ${textColor}`}>{user.name}</h2>
        <p className={`${titleColor}`}>{user.email}</p>
        <p className={`${titleColor}`}>{user.phone}</p>
        <label htmlFor="edit-profile" className={`btn btn-sm mt-4 ${buttonColor} ${buttonTextColor} ${buttonHoverColor}`}>Edit Profile</label>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center">
          <p className={`text-xl font-bold ${textColor}`}>{stats.favorites}</p>
          <p className="text-gray-500 text-sm">Favorites</p>
        </div>
        <div className="text-center">
          <p className={`text-xl font-bold ${textColor}`}>{stats.comments}</p>
          <p className="text-gray-500 text-sm">Comments</p>
        </div>
        <div className="text-center">
          <p className={`text-xl font-bold ${textColor}`}>{stats.ratings}</p>
          <p className="text-gray-500 text-sm">Ratings</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;