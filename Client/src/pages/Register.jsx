import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUser } from "../services/userService";
import "../css/loginRegister.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { errorMsg, successMsg } from "../services/feedbackService";

function Register() {
  const navigate = useNavigate();

  // Today Date
  const today = new Date();
  const day = `${today.getDate() < 10 ? "0" : ""}${today.getDate()}`;
  const month = `${today.getMonth() + 1 < 10 ? "0" : ""}${
    today.getMonth() + 1
  }`;
  const year = today.getFullYear();
  const todayDate = `${day}/${month}/${year}`;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      createdOn: todayDate.toString(),
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required(
          "Password Contain Minimum 8 Characters, 1 Uppercase letter, 1 Lowercase letter "
        )
        .min(8)
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4})(?=.*[^A-Za-z0-9]).{8,}$/),
    }),
    onSubmit: (values) => {
      let user = { ...values, isAdmin: false };
      addUser(user)
        .then((result) => {
          // Save Token to Session Storage
          sessionStorage.setItem("token", result.data.token);
          successMsg("Welcome! You registered successfully!");
          navigate("/");
        })
        .catch((err) => {
          errorMsg("Something went wrong.. Please try agian!");
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
              <span className="title fw-bold">Create New Account</span>
            </h1>
            <h6 className="text-center pb-3">
              Join in the world's larget clothing online store!
            </h6>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3 mt-4">
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-danger">{formik.errors.name}</p>
                ) : null}
                <label htmlFor="floatingInput">Full Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
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
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-danger">
                    {
                      "* Password must contain: 1 Uppercase, 1 Lowercase, 4 Digits and 1 Special Character. "
                    }
                  </p>
                ) : null}
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="button text-center">
                <button type="submit" className="btn btn-dark shiny w-100 mt-3">
                  Register
                </button>
              </div>
            </form>
            <hr className="mt-4" />
            <p className="text-center mt-3 cartItemName">
              Already have an account?{" "}
              <Link className="registerLoginForm" to="/login">
                Login
              </Link>{" "}
            </p>
          </div>
          <div className="col-lg-6">
            <img
              className="img-fluid registerImg"
              src="register.png"
              alt="Register"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
