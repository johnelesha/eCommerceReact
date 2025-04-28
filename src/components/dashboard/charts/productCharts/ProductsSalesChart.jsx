import { React, useState, useEffect } from "react";
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

const ProductsSalesChart = () => {
  const [data, setData] = useState([]);

  const urlApi = "https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/products";

  useEffect(() => {
    axios
      .get(urlApi)
      .then((res) => {
        const products = res.data;

        const chartData = products.map((product) => ({
          name: product.name,
          countOfSelling: product.countOfSelling || 0,
        }));

        setData(chartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col xs:w-full sm:w-full md:w-[calc(50%-12px)]  p-5  bg-base-100  rounded-md">
        <h2 className="text-xl font-bold mb-4">
          Count Of Selling For Each Product{" "}
        </h2>
        <div style={{ height: "400px", width: "100%" }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={150}
              />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="bottom" height={20} />
              <Bar dataKey="countOfSelling" fill="#227552" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default ProductsSalesChart;
