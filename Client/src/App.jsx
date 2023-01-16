import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../src/pages/Home";
import Products from "../src/components/Products";
import ProductDetails from "../src/pages/ProductDetails";
import Cart from "../src/pages/Cart";
import About from "../src/pages/About";
import Profile from "../src/pages/Profile";
import ScrollToTop from "./components/ScrollToTop";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import AdminPanel from "../src/pages/AdminPanel";
import EditProduct from "../src/pages/EditProduct";
import AddProduct from "../src/pages/AddProduct";
import Pnf from "../src/pages/Pnf";
import AdminProtectedRoutes from "./components/AdminProtectedRoutes";
import UserProtectedRoutes from "./components/UserProtectedRoutes";
import { getUser } from "../src/services/userService";
import { errorMsg } from "../src/services/feedbackService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Creating and Exporting useContext to Token (Session Storage) & UserDetails
export const TokenContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const [userDetails, setUserDetails] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  React.useEffect(() => {
    const isLogged = sessionStorage.getItem("token");

    if (isLogged) {
      getUser()
        .then((result) => {
          setUserDetails(result.data);
        })
        .catch((err) => {
          errorMsg("Something went wrong.. Try Again!");
        });
    } else {
      setUserDetails("");
    }
  }, [token]);

  return (
    <div className="App">
      <ToastContainer />
      {/* Wrapping / Passing Token & UserDetails to all components with UseContext */}
      <UserContext.Provider value={userDetails}>
        <TokenContext.Provider value={setToken}>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* HOME PAGE */}
              <Route path="/" element={<Home />} />

              {/* REGISTER */}
              <Route path="/register" element={<Register />} />

              {/* LOGIN */}
              <Route path="/login" element={<Login setToken={setToken} />} />

              {/* WOMENS */}
              <Route path="/women" element={<Products category={"Women"} />} />

              {/* MENS */}
              <Route path="/men" element={<Products category={"Men"} />} />

              {/* KIDS */}
              <Route path="/kids" element={<Products category={"Kids"} />} />

              {/* ACCECORIES */}
              <Route
                path="/accecories"
                element={<Products category={"Accecories"} />}
              />

              {/* SHOES AND BEGS */}
              <Route
                path="/shoes&bags"
                element={<Products category={"Shoes & Bags"} />}
              />

              {/* PLUS SIZE */}
              <Route
                path="/plus-size"
                element={<Products category={"Plus Size"} />}
              />

              {/* ABOUT US */}
              <Route path="/about" element={<About />} />

              {/* CART */}
              <Route path="/cart" element={<Cart />} />

              {/* PROFILE (With Guard) */}
              <Route element={<UserProtectedRoutes user={userDetails} />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* PRODUCT DETAILS */}
              <Route path="product/:id" element={<ProductDetails />} />

              {/* PROTECTED ROUTES (ADMIN ONLY) */}
              <Route element={<AdminProtectedRoutes user={userDetails} />}>
                <Route path="/admin-panel">
                  <Route index element={<AdminPanel />} />
                  <Route path="edit/:id" element={<EditProduct />} />
                </Route>
                {/* ADD NEW PRODUCT */}
                <Route path="/add-product" element={<AddProduct />} />
              </Route>

              <Route path="*" element={<Pnf />} />
            </Routes>
          </Router>
        </TokenContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
