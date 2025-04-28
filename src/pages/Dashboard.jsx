import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStore, FaShoppingCart, FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Charts from "../components/dashboard/Charts.jsx";
import "../components/dashboard/dashboard.css"
import useTheme from "../hooks/useTheme.js";

const Dashboard = () => {
  // all products
  let [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/products")
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // all orders
  let [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/orders")
      .then((data) => {
        setOrders(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // all users
  let [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/users")
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const theme = useTheme();
  const bgColorh1 = theme === "winter" ? "text-neutral" : "text-base-content";

  return (
    <>
      <div className="w-full">
        <h1 className={`${bgColorh1} page_title`}>Dashboard</h1>

        <div className="top flex flex-wrap flex-row items-center justify-between gap-1 sm:gap-1 md:gap-2 lg:gap-2 xl:gap-2">
          {/* products */}
          <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 card bg-base-100 shadow-lg flex flex-row items-center content-center p-3">
            <div className="p-5 h-fit rounded-full flex content-center items-center bg-pink-200">
              <FaStore className="text-2xl text-pink-600" />
            </div>
            <div className="card-body">
              <h2 className="card-title">Products</h2>
              <p> {products.length} Product</p>
            </div>
          </div>

          {/* orders */}
          <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 card bg-base-100 shadow-lg  flex flex-row items-center content-center p-3">
            <div className="p-5 h-fit rounded-full flex content-center items-center bg-green-200">
              <FaShoppingCart className="text-2xl  text-green-600" />
            </div>
            <div className="card-body">
              <h2 className="card-title">Orders</h2>
              <p>{orders.length} Order</p>
            </div>
          </div>

          {/* users */}
          <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5   card bg-base-100 shadow-lg  flex flex-row items-center content-center p-3">
            <div className="p-5 h-fit rounded-full flex content-center items-center bg-sky-200">
              <FaUsers className="text-2xl  text-sky-600" />
            </div>
            <div className="card-body">
              <h2 className="card-title">Users</h2>
              <p>{users.length} User</p>
            </div>
          </div>
        </div>

        {/* charts */}
        <Charts />
      </div>
    </>
  );
};

export default Dashboard;
