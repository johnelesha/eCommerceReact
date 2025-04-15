import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UsersWishlistChart = () => {
  const [data, setData] = useState([]);

  const urlApi = "http://localhost:3000/users";
  useEffect(() => {
    axios
      .get(urlApi)
      .then((res) => {
        const users = res.data;
        const chartData = users.map((user) => ({
          name: user.name,
          wishlistCount: user.wishlist ? user.wishlist.length : 0,
        }));
        setData(chartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const usedColors = new Set();
  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  const getUniqueColor = () => {
    let color = randomColor();
    while (usedColors.has(color)) {
      color = randomColor();
    }
    usedColors.add(color);
    return color;
  };

  return (
    <>
      <div className="flex flex-col  xs:w-full sm:w-full md:w-[calc(30%-12px)]    p-5  bg-base-100 rounded-md ">
        <h2 className="text-xl font-bold mb-4">
          Products in Wishlist per User
        </h2>
        <div style={{ height: "300px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="wishlistCount"
                nameKey="name"
                outerRadius="80%"
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getUniqueColor()} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default UsersWishlistChart;
