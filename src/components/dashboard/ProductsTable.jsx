import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { HiArrowsUpDown } from "react-icons/hi2";
import handleExportExcelSheet from "../../util/exportExcelSheet";
import ProImg from "../../assets/images/default_product.png";

const ProductsTable = () => {
  let [products, setProducts] = useState([]);
  let [sortOrder, setSortOrder] = useState("asc");
  let [filteredProducts, setFilteredProducts] = useState([]);
  let [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    category: "",
    image: null,
    rates: 1.5,
    price: 0,
    quantity: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  const [deletedProductID, setDeletedProductID] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [currentProductID, setCurrentProductID] = useState(null);

  let [isLoading, setIsLoading] = useState(true);

  const urlApi = "http://localhost:3000/products";
  useEffect(() => {
    axios
      .get(urlApi)
      .then((data) => {
        setProducts(data.data);
        setFilteredProducts(data.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setIsLoading(false);
      });
  }, []);

  const handleSorting = (column) => {
    let sortedProducts = [...filteredProducts];

    if (sortOrder === "asc") {
      sortedProducts.sort((a, b) =>
        typeof a[column] === "string"
          ? a[column].toLowerCase().localeCompare(b[column].toLowerCase())
          : a[column] - b[column]
      );
      setSortOrder("desc");
    } else {
      sortedProducts.sort((a, b) =>
        typeof b[column] === "string"
          ? b[column].toLowerCase().localeCompare(a[column].toLowerCase())
          : b[column] - a[column]
      );
      setSortOrder("asc");
    }

    setProducts(sortedProducts);
    setFilteredProducts(sortedProducts);
  };

  const handleGlobalSearch = (e) => {
    if (e.toLowerCase() === "") {
      setFilteredProducts(products);
      return;
    }
    let filteredData = products.filter((product) =>
      Object.values(product).some((val) =>
        String(val).toLowerCase().includes(e.toLowerCase())
      )
    );
    setFilteredProducts(filteredData);
  };

  const handleNameSearch = (e) => {
    if (e.toLowerCase() === "") {
      setFilteredProducts(products);
      return;
    }
    let filteredData = products.filter((product) =>
      product.name.toLowerCase().includes(e.toLowerCase())
    );
    setFilteredProducts(filteredData);
  };

  const handleTypeSearch = (e) => {
    if (e.toLowerCase() === "") {
      setFilteredProducts(products);
      return;
    }
    let filteredData = products.filter((product) =>
      product.type.toLowerCase().includes(e.toLowerCase())
    );
    setFilteredProducts(filteredData);
  };

  const handleCategorySearch = (e) => {
    if (e.toLowerCase() === "") {
      setFilteredProducts(products);
      return;
    }
    let filteredData = products.filter((product) =>
      product.category.toLowerCase().includes(e.toLowerCase())
    );
    setFilteredProducts(filteredData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const imageBase64 = formData.image;
    if (!imageBase64) {
      alert("Please choose image product");
      return;
    }

    const newID = Number(filteredProducts[filteredProducts.length - 1].id) + 1;
    const newProduct = {
      ...formData,
      id: String(newID),
      category: selectedCategory,
      imageUrl: imageBase64,
    };

    try {
      const response = await axios.post(urlApi, newProduct);
      console.log("✔ Product added: ", response.data);
      document.getElementById("addProduct-modal").close();

      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.log("❌ Error adding product:", error);
    }
  };

  const openDeleteModal = (productID) => {
    setDeletedProductID(productID);
    document.getElementById("delete-modal").showModal();
  };

  const deleteProduct = () => {
    axios
      .delete(`${urlApi}/${deletedProductID}`)
      .then(() => {
        let productsAfterDelete = products.filter(
          (product) => product.id !== deletedProductID
        );
        setProducts(productsAfterDelete);
        setFilteredProducts(productsAfterDelete);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditProduct = (product) => {
    setEditMode(true);
    setCurrentProductID(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      type: product.type,
      category: product.category,
      image: product.image,
      rates: product.rates,
      price: product.price,
      quantity: product.quantity,
    });
    setSelectedCategory(product.category);
    document.getElementById("addProduct-modal").showModal();
  };

  const updateProduct = (e) => {
    e.preventDefault();

    const imageBase64 = formData.image;

    const updatedProduct = {
      ...formData,
      id: currentProductID,
      category: selectedCategory,
      imageUrl: imageBase64,
    };

    try {
      const response = axios.put(
        `${urlApi}/${currentProductID}`,
        updatedProduct
      );
      let updatedList = products.map((product) =>
        product.id === currentProductID ? response.data : product
      );
      setProducts(updatedList);
      setFilteredProducts(updatedList);
      setEditMode(false);
      setCurrentProductID(null);
      document.getElementById("addProduct-modal").close();
    } catch (error) {
      console.log("❌ Error updating product:", error);
    }
  };

  return (
    <>
      <h1 className="page_title">All Products</h1>

      <div className="flex flex-row justify-between align-center my-5">
        <button
          className="btn btn-primary"
          onClick={() => handleExportExcelSheet(products)}
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

        <button
          className="btn btn-success"
          onClick={() =>
            document.getElementById("addProduct-modal").showModal()
          }
        >
          {" "}
          Add New Product{" "}
        </button>
        <dialog
          id="addProduct-modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box ">
            <h3 className="font-bold text-lg">Add New Product</h3>

            <fieldset className="fieldset w-fill bg-base-200 border border-base-300 p-4 rounded-box">
              <label className="fieldset-label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="enter product name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <label className="fieldset-label">Description</label>
              <input
                type="text"
                className="input"
                placeholder="enter product description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <label className="fieldset-label">Type</label>
              <div className="flex">
                <div className="flex  mr-5">
                  <label>Men</label>
                  <input
                    type="radio"
                    name="type"
                    className="radio radio-neutral"
                    value={formData.type}
                    checked={formData.type === "Men"}
                    onChange={() => setFormData({ ...formData, type: "Men" })}
                  />
                </div>
                <div className="flex">
                  <label>Women</label>
                  <input
                    type="radio"
                    name="type"
                    className="radio radio-neutral"
                    value={formData.type}
                    checked={formData.type === "Women"}
                    onChange={() => setFormData({ ...formData, type: "Women" })}
                  />
                </div>
              </div>

              <label className="fieldset-label">Category</label>
              <select
                className="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Skincare">Skincare</option>
                <option value="Haircare">Haircare</option>
                <option value="Shaving">Shaving</option>
                <option value="Perfumes">Perfumes</option>
                <option value="Makeup">Makeup</option>
                <option value="Body Care">Body Care</option>
              </select>

              <label className="fieldset-label">Image</label>
              <input
                type="file"
                className="file-input"
                onChange={handleImageChange}
              />

              <label className="fieldset-label">Price</label>
              <input
                type="number"
                className="input"
                placeholder="enter product price"
                name="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
              />

              <label className="fieldset-label">Quantity</label>
              <input
                type="number"
                className="input"
                placeholder="enter product quantity"
                name="quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
            </fieldset>

            <div className="modal-action">
              <form>
                <button
                  type="submit"
                  className="btn btn-info  mr-5"
                  onClick={(e) => (editMode ? updateProduct(e) : addProduct(e))}
                >
                  {editMode ? "Update" : "Add"}
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    document.getElementById("addProduct-modal").close();
                    setEditMode(false);
                    setCurrentProductID(null);
                    setFormData({
                      name: "",
                      description: "",
                      type: "",
                      category: "",
                      image: null,
                      rates: 0,
                      price: 0,
                      quantity: 0,
                    });
                    setSelectedCategory("");
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="content  overflow-auto">
          <table className="table">
            <thead className="">
              <tr>
                <th>
                  {" "}
                  <button className="btn" onClick={() => handleSorting("id")}>
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
                    type="search"
                    placeholder="search by name"
                    onChange={(e) => handleNameSearch(e.target.value)}
                  />
                </th>

                <th>Price </th>

                <th className="flex flex-col">
                  <button className="btn" onClick={() => handleSorting("type")}>
                    {" "}
                    Type <HiArrowsUpDown />{" "}
                  </button>
                  <input
                    type="search"
                    placeholder="search by type"
                    onChange={(e) => handleTypeSearch(e.target.value)}
                  />
                </th>

                <th>Quantity </th>

                <th>Description </th>

                <th className="flex flex-col">
                  <button
                    className="btn"
                    onClick={() => handleSorting("category")}
                  >
                    {" "}
                    Category <HiArrowsUpDown />{" "}
                  </button>
                  <input
                    type="search"
                    placeholder="search by category"
                    onChange={(e) => handleCategorySearch(e.target.value)}
                  />
                </th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td> {product.id} </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={product.image ? product.image : ProImg}
                            alt="product Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.name}</div>
                      </div>
                    </div>
                  </td>

                  <td>{product.price ?? "N/A"}$</td>

                  <td>{product.type}</td>

                  <td>{product.quantity ?? 0} piece</td>

                  <td>{product.description}</td>

                  <td> {product.category} </td>

                  <th className="flex flex-row">

                    <button
                      className="btn btn-success "
                      onClick={() => handleEditProduct(product)}
                    >
                      {" "}
                      <MdEdit />{" "}
                    </button>

                    <button
                      className="btn btn-error mx-2"
                      onClick={() => openDeleteModal(product.id)}
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

      <dialog id="delete-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are You Sure Of Deleting This Product ?
          </h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error mr-5" onClick={deleteProduct}>
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

export default ProductsTable;
