import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../services/userService";
import "../css/loginRegister.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { errorMsg, successMsg } from "../services/feedbackService";
// Importing useContext Variables
import { useContext } from "react";
import { TokenContext } from "../App";

function Login() {
  // Adding Token into setToken Variable via UseContext
  const setToken = useContext(TokenContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().min(2).email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
      login(values)
        .then((result) => {
          sessionStorage.setItem("token", result.data.token);
          successMsg("You logged in successfully!");
          setToken(result.data.token);
          navigate(-1);
        })
        .catch((err) => {
          errorMsg("Email or password are incorrect, Please try agian.");
        });
    },
  });

  return (
    <>
      <Navbar />
      <div className="container main">
        <div className="row mainForm mt-5">
          <div className="col-lg-6 col-sm-12">
            <h1 className="boldTitle text-center pt-3">
              <span className="title fw-bold">Welcome Back :)</span>
            </h1>
            <h6 className="text-center pb-3">
              Your shopping journey can begin here by logging in to your
              account.
            </h6>
            <div className="alert alert-success text-center" role="alert">
              <strong>Demo Admin User:</strong> admin@shinestore.com |{" "}
              <strong>Password: </strong>
              Admin1234?
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3 mt-4">
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-danger">{formik.errors.email}</p>
                ) : null}
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-danger">{formik.errors.password}</p>
                ) : null}
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="button text-center">
                <button type="submit" className="btn btn-dark shiny w-100 mt-3">
                  Login
                </button>
              </div>
            </form>
            <hr className="mt-4" />

            <p className="text-center mt-3 cartItemName">
              New User? Click here to{" "}
              <Link className="registerLoginForm" to="/register">
                Register
              </Link>{" "}
            </p>
          </div>
          <div className="col-lg-6">
            <img
              className="img-fluid registerImg"
              src="login.png"
              alt="Login"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
