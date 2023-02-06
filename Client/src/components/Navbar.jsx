import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import "../css/home.css";
import { getProductsInCart } from "../services/cartService";
import { successMsg, errorMsg } from "../services/feedbackService";
import DarkModeToggle from "../components/DarkModeToggle";
import { TokenContext, UserContext } from "../App";

function Navbar(props) {
  const setToken = useContext(TokenContext);
  const userDetails = useContext(UserContext);
  const [isChanged, setIsChanged] = useState(false);
  const [cart, setCart] = useState("");
  const navigate = useNavigate();
  const isLogged = sessionStorage.getItem("token");
  const cartChange = props.cartChange;
  const cartRender = props.cartRender;

  const handleLogout = () => {
    setIsChanged(!isChanged);
    sessionStorage.removeItem("token");
    setToken("");
    successMsg("You Logged Out Successfully!");
    navigate("/");
  };

  React.useEffect(() => {
    if (isLogged) {
      getProductsInCart()
        .then((result) => {
          setCart(result.data);
        })
        .catch((err) => {
          errorMsg("Something went wrong.. Try Again!");
        });
    }
  }, [isChanged, cartChange, cartRender]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark" id="navBar">
        <div className="container">
          <NavLink className="navbar-brand " to="/">
            <img
              className="navLogo img-fluid shiny"
              src="../../Logo.png"
              alt="Logo"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/women">
                  <i className="fa-solid fa-venus women"></i> Women
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/men">
                  <i className="fa-solid fa-mars men"></i> Men
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/kids">
                  Kids
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/plus-size">
                  Plus Size
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shoes&bags">
                  Shoes & Bags
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/accecories">
                  Accessories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>

              {userDetails.isAdmin ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-success adminPanelLink"
                    to="/admin-panel"
                  >
                    <i className="fa-solid fa-unlock"></i> Admin Panel
                  </NavLink>
                </li>
              ) : null}
            </ul>
            <div className="darkMode mx-2">
              <DarkModeToggle />
            </div>
            <div className="nav-item dropdown text-light">
              {/* CART */}
              <NavLink className="position-relative navLink" to="/cart">
                {cart.length ? (
                  <>
                    <i className="fa-solid fa-bag-shopping fa-lg hoverIcon navLink"></i>
                    <span className="badge position-absolute top-0 start-100 translate-middle rounded-pill text-bg-danger">
                      {cart.length}
                    </span>
                  </>
                ) : (
                  <i className="fa-solid fa-bag-shopping fa-lg hoverIcon navLink"></i>
                )}
              </NavLink>
            </div>
            <div className="nav-item dropdown text-light">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user fa-lg hoverIcon"></i>{" "}
                <span className="navName">
                  {isLogged ? userDetails.name : null}
                </span>
              </a>
              <ul className="dropdown-menu">
                {isLogged ? null : (
                  <>
                    <li>
                      <NavLink className="dropdown-item" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/register">
                        Register
                      </NavLink>
                    </li>
                  </>
                )}

                {isLogged ? (
                  <>
                    <li>
                      <NavLink className="dropdown-item" to="/profile">
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <a onClick={handleLogout} className="dropdown-item">
                        <i className="fa-solid fa-power-off"></i> Logout
                      </a>
                    </li>
                  </>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
