import axios from "axios";
import _ from "lodash";

const api = import.meta.env.VITE_API_BASE_URL || "";

// Add New Product
export const addProduct = (newProduct) => {
  return axios.post(`${api}products`, newProduct, {
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
};

// Get All Products
export const getAllProducts = () => {
  return axios.get(`${api}products`);
};

// Get product by ID
export const getProductById = (id) => {
  return axios.get(`${api}products/${id}`);
};

// Edit Products
export const editProduct = (product) => {
  let body = _.omit(product, ["_id"]);
  return axios.put(`${api}products/${product._id}`, body, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};

// Delete Product
export const deleteProduct = (product) => {
  return axios.delete(`${api}products/${product._id}`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};
