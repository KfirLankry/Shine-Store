import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/admin.css";
import { getAllUsers } from "../services/userService";
import { getAllProducts, deleteProduct } from "../services/productsService";
// import { useState } from "react";
import { successMsg, errorMsg } from "../services/feedbackService";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import DeleteModal from "../components/DeleteModal";

function AdminPanel() {
  const userDetails = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState();
  const [isChanged, setIsChanged] = useState(false);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    // Get All Users Details
    getAllUsers()
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => {
        errorMsg("Something went wrong.. Try Agian!");
      });

    // Getting All Products InStore
    getAllProducts()
      .then((result) => {
        setProducts(result.data);
        setIsLoading(true);
      })
      .catch((err) => {
        errorMsg("Something went wrong.. Try Again!");
      });
  }, [isChanged]);

  const handleDeleteProduct = (product) => {
    deleteProduct(product)
      .then(() => {
        successMsg(`Product deleted Successfully!`);
        setIsChanged(!isChanged);
      })
      .catch((err) => {
        errorMsg("Something went wrong! Please Try Again.");
      });
  };

  return (
    <>
      <Navbar />
      {/* Adds Spinner on Page While Data is Fetched */}
      {isLoading ? (
        <div className="container main ">
          {/* TABS */}
          <ul
            className="nav nav-pills mb-3 pt-4 mainTabs"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="btn btn-dark active mx-2 shiny adminBtn"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <i className="fa-solid fa-gauge"></i> Dashboard
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="btn btn-dark shiny"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <i className="fa-solid fa-file-pen"></i> Edit / Delete Product
              </button>
            </li>
          </ul>

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex="0"
            >
              {/* DASHBOARD */}
              {/* Cards */}
              {userDetails.isAdmin ? (
                <div className="row my-2">
                  <div className="col">
                    <div
                      className="card purple w-100"
                      style={{ width: "100%" }}
                    >
                      <div className="card-body">
                        <i className="fa-solid fa-square-plus icon"></i>
                        <h1 className="text-white">
                          <i className="fa-solid fa-plus"></i>
                        </h1>
                        <h5 className="card-title">New Product</h5>
                      </div>

                      <Link
                        to={"/add-product"}
                        className="cardBottom"
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                      >
                        Add Product <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card green" style={{ width: "100%" }}>
                      <div className="card-body">
                        <i className="fa-solid fa-users icon"></i>
                        <h1 className="text-white">{users.length}</h1>
                        <h5 className="card-title">Total Users</h5>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card red" style={{ width: "100%" }}>
                      <div className="card-body">
                        <i className="fa-solid fa-shirt icon"></i>
                        <h1 className="text-white">{products.length}</h1>
                        <h5 className="card-title">Total Products</h5>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card blue" style={{ width: "100%" }}>
                      <div className="card-body">
                        <i className="fa-solid fa-bars-staggered icon"></i>
                        <h1 className="text-white">6</h1>
                        <h5 className="card-title">Categories</h5>
                      </div>
                    </div>
                  </div>

                  <h1 className="boldTitle text-center pt-3 mt-4">
                    <span className="tapered2">Most Recent Customers</span>
                  </h1>
                  <h6 className="text-center">
                    10 Most Recent Registered Users.
                  </h6>
                  {/* Recent Customers Table */}
                  <div className="tableDiv mt-2">
                    <table className="table shadowTable table-striped table-hover table-bordered text-center">
                      <thead>
                        <tr className="tableRow bg-dark text-white">
                          <th scope="col">#</th>
                          <th scope="col">Full Name</th>
                          <th scope="col">Joined On</th>
                          <th scope="col">Customer Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* 10 Newest Customers */}
                        {users
                          .reverse()
                          .filter((item, index) => index < 10)
                          .map((user, index) => {
                            return (
                              <tr className="tableRows" key={user._id}>
                                <td scope="row">{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.createdOn}</td>
                                <td>{user.email}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
            {/* Edit / Delete TAB */}
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex="0"
            >
              {/* SEARCH BAR */}

              <div className="search pb-3">
                <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    className="form-control w-75 search-Control"
                    placeholder="Search Product..."
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                  />
                  {/* FILTER */}
                  <select
                    className="form-select mx-1 "
                    aria-label="Default select example"
                    onChange={(e) => setSelect(e.target.value)}
                  >
                    <option value={""}>All</option>
                    <option value="Women">Women Clothing</option>
                    <option value="Men">Men Clothing</option>
                    <option value="Kids">Kids</option>
                    <option value="Plus Size">Plus Size</option>
                    <option value="Shoes & Bags">Shoes & Bags</option>
                    <option value="Accecories">Accecories</option>
                  </select>
                </div>
              </div>

              <div className="products">
                {products
                  .filter((item) => {
                    return search.toLowerCase() == ""
                      ? item
                      : item.name.toLowerCase().includes(search);
                  })
                  .filter((selected) => {
                    return select == undefined
                      ? selected
                      : selected.category.includes(select);
                  })
                  .map((product) => {
                    return (
                      <div className="product-card " key={product._id}>
                        {/* Hot Badge */}
                        {product.hot ? <div className="badge">Hot</div> : null}

                        <Link to={`/product/${product._id}`}>
                          <img
                            className="productImg"
                            src={product.image}
                            alt="Item"
                          />
                        </Link>
                        <div className="product-details">
                          <div className="row">
                            <div className="col-9">
                              <span className="product-catagory">
                                {" "}
                                <i className="fa-solid fa-tags"> </i>{" "}
                                {product.category}
                              </span>
                            </div>
                            <div className="rating col-3">
                              {" "}
                              <span>
                                <i
                                  className="fa-solid fa-star"
                                  style={{ color: "#FFD700" }}
                                ></i>{" "}
                                <strong className="rate">{product.rate}</strong>
                              </span>
                            </div>
                          </div>
                          <h4>
                            <Link to={`/product/${product._id}`}>
                              {product.name}
                            </Link>
                          </h4>
                          {/* In Stock / Out of stock Conditions */}
                          <p>{product.description}</p>

                          <div className="row">
                            <div className="col">
                              <span className="product-price">
                                {product.price}₪
                              </span>
                            </div>
                            <div className="col">
                              {" "}
                              {product.inStock ? (
                                <div className="inStock mt-1">
                                  <i className="fa-solid fa-check"></i> In
                                  Stock!
                                </div>
                              ) : (
                                <div className="outOfStock mt-1">
                                  Out Of Stock!
                                </div>
                              )}
                            </div>
                          </div>
                          <hr className="mt-2" />
                          <div className="btns text-center mt-3">
                            <div className="row">
                              <div className="col">
                                <Link
                                  to={`edit/${product._id}`}
                                  className="btn btn-secondary mx-1 shiny w-100"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>{" "}
                                  Edit
                                </Link>
                              </div>
                              <div className="col">
                                <DeleteModal
                                  handleDeleteProduct={handleDeleteProduct}
                                  product={product}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* End Of TABS */}
        </div>
      ) : (
        <div className="spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default AdminPanel;
