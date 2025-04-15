import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OrderTotalAmountChart = () => {
  const [data, setData] = useState([]);

  const urlApi = "http://localhost:3000/orders";
  useEffect(() => {
    axios
      .get(urlApi)
      .then((res) => {
        const orders = res.data;

        const chartData = orders.map((order) => ({
          date: order.date,
          totalAmount: order.totalAmount,
        }));

        setData(chartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col  xs:w-full sm:w-full md:w-full   p-5  bg-base-100 rounded-md ">
        <h2>Orders Total Amount Over Time </h2>
        <div style={{ height: "300px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalAmount"
                stroke="#7d7dee"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default OrderTotalAmountChart;
