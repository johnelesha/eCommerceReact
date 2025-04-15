import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { HiArrowsUpDown } from "react-icons/hi2";
import handleExportExcelSheet from "../../util/exportExcelSheet.js";
import UserImg from "../../assets/images/default_user.jpg";

const UsersTable = () => {
  let [users, setUsers] = useState([]);
  let [sortOrder, setSortOrder] = useState("asc");
  let [filteredUsers, setFilteredUsers] = useState([]);
  let [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: [
      {
        city: "",
      },
    ],
    image: null,
  });

  let [role, setRole] = useState([]);
  let [selectedRole, setSelectedRole] = useState("");
  let [currentEditingUserId, setCurrentEditingUserId] = useState(null);

  let [currentDeletingUserId, setCurrentDeletingUserId] = useState(null);

  let [isLoading, setIsLoading] = useState(true);

  const urlApi = "http://localhost:3000/users";
  useEffect(() => {
    axios
      .get(urlApi)
      .then((data) => {
        setUsers(data.data);
        setFilteredUsers(data.data);

        let allRoles = new Set(data.data.map((user) => user.role));
        setRole([...allRoles]);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setIsLoading(false);
      });
  }, []);

  const handleSorting = (column) => {
    let sortedUsers = [...users];

    if (column === "address") {
      if (sortOrder === "asc") {
        sortedUsers.sort((a, b) =>
          a.address[0].city
            .toLowerCase()
            .localeCompare(b.address[0].city.toLowerCase())
        );
        setSortOrder("desc");
      } else {
        sortedUsers.sort((a, b) =>
          b.address[0].city
            .toLowerCase()
            .localeCompare(a.address[0].city.toLowerCase())
        );
        setSortOrder("asc");
      }
    } else {
      if (sortOrder === "asc") {
        sortedUsers.sort((a, b) =>
          typeof a[column] === "string"
            ? a[column].toLowerCase().localeCompare(b[column].toLowerCase())
            : a[column] - b[column]
        );
        setSortOrder("desc");
      } else {
        sortedUsers.sort((a, b) =>
          typeof b[column] === "string"
            ? b[column].toLowerCase().localeCompare(a[column].toLowerCase())
            : b[column] - a[column]
        );
        setSortOrder("asc");
      }
    }

    setUsers(sortedUsers);
    setFilteredUsers(sortedUsers);
  };

  const handleGlobalSearch = (e) => {
    if (e.toLowerCase() === "") {
      setFilteredUsers(users);
      return;
    }
    let filteredData = users.filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(e.toLowerCase())
      )
    );
    setFilteredUsers(filteredData);
  };

  const handleNameSearch = (e) => {
    if (e.toLowerCase() === "") {
      setFilteredUsers(users);
      return;
    }
    let filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(e.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };
  const handleEmailSearch = (e) => {
    if (e.toLowerCase() === "") {
      setFilteredUsers(users);
      return;
    }
    let filteredData = users.filter((user) =>
      user.email.toLowerCase().includes(e.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };
  const handleAddressSearch = (e) => {
    if (e.toLowerCase() === "") {
      setFilteredUsers(users);
      return;
    }
    let filteredData = users.filter((user) =>
      user.address[0].city.toLowerCase().includes(e.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const addUser = (e) => {
    e.preventDefault();

    const newID = Math.max(...filteredUsers.map((user) => user.id)) + 1; // spread operator
    const newUser = { ...formData, id: newID };

    axios
      .post(`${urlApi}`, newUser)
      .then((res) => {
        let usersAfterAdd = [...filteredUsers, formData];
        setUsers(usersAfterAdd);
        setFilteredUsers(usersAfterAdd);

        document.getElementById("my_modal_5").close();

        console.log("new user added successfully ...", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const serverFormData = new FormData();
      serverFormData.append("image", file);
      axios
        .post("https://your-api.com/upload", serverFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .the((res) => {
          const imageUrl = res.data.imageUrl;
          setFormData({
            ...formData,
            image: imageUrl,
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const openEditModal = (userId, currentRole) => {
    setCurrentEditingUserId(userId);
    setSelectedRole(currentRole);
    document.getElementById("edit-modal").showModal();
  };

  const handleEditRole = () => {
    axios
      .patch(
        `${urlApi}/${Number(currentEditingUserId)}`,
        {
          role: selectedRole,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        const updatedUsers = users.map((user) =>
          user.id === currentEditingUserId
            ? { ...user, status: selectedRole }
            : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);

        document.getElementById("edit-modal").close();
        setCurrentEditingUserId(null);
        setSelectedRole("");

        console.log("order edited successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openDeleteModal = (userId) => {
    setCurrentDeletingUserId(userId);
    document.getElementById("delete-modal").showModal();
  };

  const deleteUser = () => {
    axios
      .delete(`${urlApi}/${currentDeletingUserId}`)
      .then(() => {
        let usersAfterDelete = users.filter(
          (user) => user.id !== currentDeletingUserId
        );
        setUsers(usersAfterDelete);
        setFilteredUsers(usersAfterDelete);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1 className="page_title">All Users</h1>

      <div className="flex flex-row justify-between align-center my-5">
        <button
          className="btn btn-primary"
          onClick={() => handleExportExcelSheet(users)}
        >
          {" "}
          Export to Excel{" "}
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

            <thead className="">
              <tr className="">
                
                <th>
                  {" "}
                  <button className="btn " onClick={() => handleSorting("id")}>
                    {" "}
                    ID <HiArrowsUpDown />{" "}
                  </button>{" "}
                </th>

                <th className="flex flex-col">
                  <button className="btn" onClick={() => handleSorting("name")}>
                    {" "}
                    Name <HiArrowsUpDown />{" "}
                  </button>
                  <input
                    className="text-center"
                    type="search"
                    placeholder="search by name"
                    onChange={(e) => handleNameSearch(e.target.value)}
                  />
                </th>

                <th>
                  {" "}
                  <button className="btn" onClick={() => handleSorting("role")}>
                    Role <HiArrowsUpDown />
                  </button>{" "}
                </th>

                <th className="flex flex-col">
                  <button
                    className="btn"
                    onClick={() => handleSorting("email")}
                  >
                    {" "}
                    Email <HiArrowsUpDown />{" "}
                  </button>
                  <input
                    className="text-center"
                    type="search"
                    placeholder="search by email"
                    onChange={(e) => handleEmailSearch(e.target.value)}
                  />
                </th>

                <th>
                  {" "}
                  <button
                    className="btn"
                    onClick={() => handleSorting("phone")}
                  >
                    Phone <HiArrowsUpDown />
                  </button>{" "}
                </th>

                <th className="flex flex-col">
                  <button
                    className="btn"
                    onClick={() => handleSorting("address")}
                  >
                    {" "}
                    Address <HiArrowsUpDown />{" "}
                  </button>
                  <input
                    className="text-center"
                    type="search"
                    placeholder="search by address"
                    onChange={(e) => handleAddressSearch(e.target.value)}
                  />
                </th>

                <th>
                  {" "}
                  <button className="btn">Actions</button>{" "}
                </th>
              </tr>
            </thead>

            <tbody className="">
              {filteredUsers.map((user) => (
                <tr key={user.id}>

                  <td> {user.id} </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.image ? user.image : UserImg}
                            alt="User Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>

                  <td>{user.role}</td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>

                  <td> {user.address[0].city} </td>

                  <th className="flex flex-row">
                    <button
                      className="btn btn-success mx-2 "
                      onClick={() => openEditModal(user.id, user.role)}
                    >
                      {" "}
                      <MdEdit />{" "}
                    </button>

                    <button
                      className="btn btn-error "
                      onClick={() => openDeleteModal(user.id)}
                    >
                      {" "}
                      <MdDelete />{" "}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>

            <tfoot></tfoot>
          </table>
        </div>
      )}

      <dialog id="edit-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Edit Status Of The Order</h3>
          <select
            value={selectedRole}
            className="select  select-success"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {role.map((status, index) => (
              <option key={index} value={status}>
                {" "}
                {status}{" "}
              </option>
            ))}
          </select>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-success mr-5" onClick={handleEditRole}>
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
            Are You Sure Of Deleting This User ?
          </h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error mr-5" onClick={deleteUser}>
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

export default UsersTable;
