import axios from "axios";
import jwt_decode from "jwt-decode";

const api = import.meta.env.VITE_API_BASE_URL || "";

// REGISTER
export const addUser = (newUser) => {
  return axios.post(`${api}register`, newUser);
};

// LOGIN
export const login = (values) => {
  return axios.post(`${api}login`, values);
};

// GET USER DETAILS
export const getUser = () => {
  return axios.get(`${api}profile`, {
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
};

// GET ALL USERS DETAILS
export const getAllUsers = () => {
  return axios.get(`${api}all-users`, {
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
};

// Get "isAdmin" payload from token
export const getIsAdmin = () => {
  return jwt_decode(sessionStorage.getItem("token")).isAdmin;
};
