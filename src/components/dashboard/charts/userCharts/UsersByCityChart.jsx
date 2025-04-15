import { React, useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UsersByCityChart = () => {
  const [data, setData] = useState([]);

  const urlApi = "http://localhost:3000/users";
  useEffect(() => {
    axios
      .get(urlApi)
      .then((res) => {
        const users = res.data;
        const cityCount = {};
        users.forEach((user) => {
          const city = user.address?.[0]?.city || "Unknown";
          cityCount[city] = (cityCount[city] || 0) + 1;
        });

        const chartData = Object.entries(cityCount).map(([city, count]) => ({
          city,
          count,
        }));

        setData(chartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col xs:w-full sm:w-full md:w-[calc(70%-12px)]   p-5  bg-base-100  rounded-md">
      <h2 className="text-xl font-bold mb-4">Users per City</h2>

      <div style={{ height: "300px", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#00bcd4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsersByCityChart;
