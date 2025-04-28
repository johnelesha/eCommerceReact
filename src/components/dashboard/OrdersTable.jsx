import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { HiArrowsUpDown } from "react-icons/hi2";
import handleExportExcelSheet from "../../util/exportExcelSheet.js";

const OrdersTable = () => {
  let [orders, setOrders] = useState([]);
  let [sortOrder, setSortOrder] = useState("asc");
  let [filteredOrders, setFilteredOrders] = useState([]);

  let [statuses, setStatuses] = useState([]);
  let [selectedStatus, setSelectedStatus] = useState("");
  let [currentEditingOrderId, setCurrentEditingOrderId] = useState(null);
  let [currentDeletingOrderId, setCurrentDeletingOrderId] = useState(null);

  let [isLoading, setIsLoading] = useState(true);

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

  const urlApi = "https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/orders";
  useEffect(() => {
    axios
      .get(urlApi)
      .then((data) => {
        const ordersWithUserNames = data.data.map((order) => {
          const user = users.find((u) => Number(u.id) === Number(order.userId));
          return {
            ...order,
            userName: user ? user.name : "Unknown User",
          };
        });

        setOrders(ordersWithUserNames);
        setFilteredOrders(ordersWithUserNames);

        let allStatus = new Set(data.data.map((order) => order.status));
        setStatuses([...allStatus]);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setIsLoading(false);
      });
  }, [users]);

  const handleSorting = (column) => {
    let sortedOrders = [...orders];

    if (sortOrder === "asc") {
      sortedOrders.sort((a, b) =>
        typeof a[column] === "string"
          ? a[column].toLowerCase().localeCompare(b[column].toLowerCase())
          : a[column] - b[column]
      );
      setSortOrder("desc");
    } else {
      sortedOrders.sort((a, b) =>
        typeof b[column] === "string"
          ? b[column].toLowerCase().localeCompare(a[column].toLowerCase())
          : b[column] - a[column]
      );
      setSortOrder("asc");
    }

    setOrders(sortedOrders);
    setFilteredOrders(sortedOrders);
  };

  const handleGlobalSearch = (e) => {
    if (e.toLowerCase() === "") {
      setFilteredOrders(orders);
      return;
    }
    let filteredData = orders.filter((order) =>
      Object.values(order).some((val) =>
        String(val).toLowerCase().includes(e.toLowerCase())
      )
    );
    setFilteredOrders(filteredData);
  };

  const openEditModal = (orderId, currentStatus) => {
    setCurrentEditingOrderId(orderId);
    setSelectedStatus(currentStatus);
    document.getElementById("edit-modal").showModal();
  };

  const handleEditStatus = () => {
    axios
      .patch(
        `${urlApi}/${currentEditingOrderId}`,
        {
          status: selectedStatus,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("Order status updated successfully!", res.data);
        const updatedOrders = orders.map((order) =>
          order.id === currentEditingOrderId
            ? { ...order, status: selectedStatus }
            : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);

        document.getElementById("edit-modal").close();
        setCurrentEditingOrderId(null);
        setSelectedStatus("");

        console.log("order edited successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openDeleteModal = (orderId) => {
    setCurrentDeletingOrderId(orderId);
    document.getElementById("delete-modal").showModal();
  };

  const handleDeleteOrder = () => {
    axios
      .delete(`${urlApi}/${currentDeletingOrderId}`)
      .then((response) => {
        console.log("Order deleted successfully!", response.data);
        let newOrdersList = orders.filter((order) => order.id !== currentDeletingOrderId);

        setOrders(newOrdersList);
        setFilteredOrders(newOrdersList);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h1 className="page_title">All Orders</h1>

      <div className="flex flex-row justify-between align-center my-5">
        <button
          className="btn btn-primary"
          onClick={() => handleExportExcelSheet(orders)}
        >
          Export to Excel
        </button>

        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            onChange={(e) => handleGlobalSearch(e.target.value)}
          />
        </label>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="content  overflow-auto">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <button className="btn" onClick={() => handleSorting("id")}>
                    Order ID <HiArrowsUpDown />
                  </button>
                </th>
                <th>
                  <button
                    className="btn"
                    onClick={() => handleSorting("userId")}
                  >
                    User Name <HiArrowsUpDown />
                  </button>
                </th>
                <th>
                  <button className="btn" onClick={() => handleSorting("date")}>
                    Date <HiArrowsUpDown />
                  </button>
                </th>
                <th>
                  <button
                    className="btn"
                    onClick={() => handleSorting("totalAmount")}
                  >
                    totalAmount <HiArrowsUpDown />
                  </button>
                </th>
                <th>
                  <button
                    className="btn"
                    onClick={() => handleSorting("status")}
                  >
                    status <HiArrowsUpDown />
                  </button>
                </th>
                <th>
                  <button className="btn"> Actions </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>

                  <td> {order.id} </td>
                  <td> {order.userName} </td>
                  <td> {order.date} </td>
                  <td> {order.totalAmount} </td>
                  <td className="flex">
                    {order.status}
                    <MdEdit
                      className="text-lg ml-3 hover:text-green-500 hover:text-2xl hover:cursor-pointer"
                      onClick={() => openEditModal(order.id, order.status)}
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-error"
                      onClick={() => openDeleteModal(order.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog id="edit-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Edit Status Of The Order</h3>
          <select
            value={selectedStatus}
            className="select  select-success"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {" "}
                {status}{" "}
              </option>
            ))}
          </select>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-success mr-5"
                onClick={handleEditStatus}
              >
                Edit
              </button>
              <button className="btn btn-error">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="delete-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are You Sure Of Deleting This Order ?
          </h3>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-error mr-5"
                onClick={handleDeleteOrder}
              >
                Delete
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default OrdersTable;
