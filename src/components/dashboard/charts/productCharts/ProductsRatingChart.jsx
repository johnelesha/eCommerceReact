import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProductsRatingChart = () => {
  const [data, setData] = useState([]);

  const urlApi = "http://localhost:3000/products";
  useEffect(() => {
    axios
      .get(urlApi)
      .then((res) => {
        const products = res.data;
        console.log(products)

        const chartData = products.map((product) => {

          const ratesArray = Array.isArray(product.rates) ? product.rates : [];
          const total = ratesArray.reduce((acc, rate) => acc + rate.rated, 0);
          const average = ratesArray.length > 0 ? parseFloat((total / ratesArray.length).toFixed(3)) : 0;
        
          return {
            name: product.name,
            rates: average,
          };
        });

        setData(chartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col  xs:w-full sm:w-full md:w-[calc(50%-12px)]   p-5  bg-base-100 rounded-md ">
        <h2 className="text-xl font-bold mb-4">Ratings per Product</h2>
        <div style={{ height: "300px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="80%" width={730} height={250} data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis  />
              <Radar
                name="Product Ratings"
                dataKey="rates"
                stroke="#8884d8"
                fill="#FFFF00"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default ProductsRatingChart;
