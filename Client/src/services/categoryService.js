import axios from "axios";
const api = import.meta.env.VITE_API_BASE_URL || "";

// Get All Categorys
export const getAllCategorys = () => {
  return axios.get(`${api}category`);
};
