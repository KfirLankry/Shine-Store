import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { errorMsg, successMsg } from "../services/feedbackService";
import { getProductById, editProduct } from "../services/productsService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/addEdit.css";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    inStock: false,
    hot: false,
  });

  React.useEffect(() => {
    getProductById(id)
      .then((result) => setProduct(result.data))
      .catch((err) => {
        errorMsg("Something went wrong.. Try Again!");
      });
  }, []);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      inStock: product.inStock,
      hot: product.hot,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      price: yup.number().required().min(2),
      category: yup.string().required().min(2),
      description: yup.string().required().min(6),
      image: yup.string().required(),
      inStock: yup.boolean().required(),
      hot: yup.boolean().required(),
    }),
    onSubmit: (values) => {
      let product = { ...values, _id: id };
      editProduct(product)
        .then((result) => {
          successMsg("Product Updated successfully!");
          navigate("/admin-panel");
        })
        .catch((err) => {
          errorMsg("Something went wrong! Please Try Again.");
        });
    },
  });

  return (
    <>
      <Navbar />
      <div className="container main">
        <h1 className="boldTitle text-center pt-3 mt-3">
          <span className="tapered2">Edit Product</span>
        </h1>
        <div className="row">
          <div className="rightDiv col-lg-6 col-sm-12 mt-5 mb-5">
            <form className="mt-4" onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3 mt-1 mx-auto">
                <input
                  id="name"
                  type="name"
                  className="form-control"
                  placeholder="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-danger">{formik.errors.name}</p>
                ) : null}
                <label htmlFor="floatingInput">Product Name</label>
              </div>
              <div className="row">
                <div className="col-lg-6 col-sm-12">
                  <div className="form-floating mb-3 mt-1 mx-auto">
                    <input
                      id="price"
                      type="number"
                      className="form-control"
                      placeholder="price"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <p className="text-danger">{formik.errors.price}</p>
                    ) : null}
                    <label htmlFor="floatingInput">Price</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating mb-3 mt-1 mx-auto">
                    <select
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      name="category"
                      id="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option>Choose Category:</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                      <option value="Plus Size">Plus Size</option>
                      <option value="Shoes & Bags">Shoes & Bags</option>
                      <option value="Accecories">Accecories</option>
                    </select>
                    <label htmlFor="floatingInput">Category</label>
                  </div>
                </div>
              </div>

              <div className="mb-3 mt-1 mx-auto">
                <textarea
                  id="description"
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  cols="20"
                  rows="5"
                ></textarea>

                {formik.touched.description && formik.errors.description ? (
                  <p className="text-danger">{formik.errors.description}</p>
                ) : null}
              </div>

              <div className="form-floating mb-3 mt-1 mx-auto">
                <input
                  id="image"
                  type="text"
                  className="form-control"
                  placeholder="image"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image ? (
                  <p className="text-danger">{formik.errors.image}</p>
                ) : null}
                <label htmlFor="floatingInput">Image (e.g 867px X 889px)</label>
              </div>

              <div className="row">
                <div className="col">
                  {" "}
                  <div className="form-floating mb-3 mt-1 mx-auto">
                    <select
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      name="inStock"
                      id="inStock"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.inStock}
                    >
                      <option>Choose Stock Status:</option>
                      <option value={true}>In Stock</option>
                      <option value={false}>Out Of Stock</option>
                    </select>
                    <label htmlFor="floatingInput">Stock</label>
                  </div>
                </div>
                <div className="col">
                  {" "}
                  <div className="form-floating mb-3 mt-1 mx-auto">
                    <select
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      name="hot"
                      id="hot"
                      value={formik.values.hot}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option>Product Popularity:</option>
                      <option value={true}>Hot</option>
                      <option value={false}>Not Hot</option>
                    </select>
                    <label htmlFor="floatingInput">Popularity</label>
                  </div>
                </div>
              </div>
              {formik.values.category === "Women" ||
              formik.values.category === "Men" ||
              formik.values.category === "Kids" ||
              formik.values.category === "Plus Size" ? (
                <div className="sizes descClass">
                  <span>Product Sizes: </span>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="XS"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      XS
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="S"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      S
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="M"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      M
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="L"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      L
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="XL"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      XL
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="XXL"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      XXL
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="XXXL"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      XXXL
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="One-Size"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      One-Size
                    </label>
                  </div>
                </div>
              ) : formik.values.category === "Shoes & Bags" ? (
                <div className="sizes descClass">
                  <span>Shoes Sizes: </span>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="EU35"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      EU35
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="EU36"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      EU36
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="EU37"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      EU37
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="EU38"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      EU38
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="EU39"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      EU39
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="EU40"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      EU40
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="EU41"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      EU41
                    </label>
                  </div>
                </div>
              ) : formik.values.category === "Accecories" ? (
                <div className="sizes descClass">
                  <span>Accecories Sizes: </span>
                  <div className="form-check form-check-inline">
                    <input
                      id="productSize"
                      type="checkbox"
                      className="form-check-input"
                      name="productSize"
                      value="Standart"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      Standart
                    </label>
                  </div>
                </div>
              ) : null}

              <div className="form-group mt-4 text-center">
                <button
                  className="btn btn-dark w-100 shiny adminBtn"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  <i className="fa-solid fa-pen-to-square"></i> Edit Product
                </button>
              </div>
            </form>
          </div>
          <div className="sideImg col-lg-6 col-sm-12 mt-5 mb-5">
            <img
              className="newProductImg img-fluid mt-4"
              src="../../edit.png"
              alt="Edit"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProduct;
