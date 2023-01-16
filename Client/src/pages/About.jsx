import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/about.css";
function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="container pt-4 pb-4 main">
        <h1 className="boldTitle text-center pt-3">
          <span className="tapered2">About Shine</span>
        </h1>
        <div className="row images">
          <div className="col-lg-4">
            <img className="aboutImg img-fluid" src="image1.png" alt="About" />
            <h4 className="text-center">Our Brand</h4>
            <p className="text-center txtGrey">
              We are a global brand for Everyone, we believe in affordable
              fashion for all. We are the number 1 destination for fashion and
              lifestyle for all the occasions in your life.
            </p>
          </div>
          <div className="col-lg-4">
            <img className="aboutImg img-fluid" src="image2.png" alt="About" />
            <h4 className="text-center">Our Mission</h4>
            <p className="text-center txtGrey">
              We aim empower you to look and feel confident. To increase your
              self-esteem and body positivity to help you realise your true
              potential.
            </p>
          </div>
          <div className="col-lg-4">
            <img className="aboutImg img-fluid" src="image3.png" alt="About" />
            <h4 className="text-center">Our Aim</h4>
            <p className="text-center txtGrey">
              To use our social reach and platform to educate, empower and
              inspire our customers to drive purposeful positive change.
            </p>
          </div>
          <hr className="mt-5 mb-5" />
          <h1 className="boldTitle text-center">
            <span className="tapered2">About This Project</span>
          </h1>
        </div>
        <h1 className="boldTitle text-center"></h1>
        <div className="row images">
          <div className="myImg col-lg-3">
            <img
              className="aboutImg profile img-fluid"
              src="Profile.jpg"
              alt="About"
            />
            <div className="mt-3">
              <a
                href="https://www.linkedin.com/in/kfirlankry/"
                target="_blank"
                className="btn btn-dark mx-1 shiny"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://kfirlankry.com/"
                className="btn btn-dark mx-1 shiny"
                target="_blank"
              >
                <i className="fa-solid fa-earth-americas"></i>
              </a>
              <a
                href="https://github.com/KfirLankry"
                className="btn btn-dark mx-1 shiny"
                target="_blank"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="mailto:lankrykfir@gmail.com"
                className="btn btn-dark mx-1 shiny"
                target="_blank"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-9 aboutMe">
            <p className="txtGrey">
              Hello World! I am Kfir Lankry, Fullstack Web Development graduate
              at HackerU college, specializing in advanced frameworks as React,
              Angular, Node.js , MongoDB.
            </p>
            <p className="mt-3 txtGrey">
              Im super happy and proud to present my FINAL summary Fullstack
              project! , The project was developed within 7 days as part of my
              studies at Hackeru College. <br />A single page, End-to-End
              application inspired by Shein - "Shine" is a fake fashion
              e-commerce platform that focuses on women's wear, but also offers
              men's apparel, children's clothes, accessories, shoes, bags and
              other fashion items.
            </p>
            <p className="mt-3 txtGrey">
              <span className="fw-bold">Project Stack:</span> Frontend was
              Developed with React, Vite, React Bootstrap, Tostify, Formik, Yup,
              JWT Decode. <br />
              Backend was Developed with NodeJs, Express, Bcrypt, Joi,
              JsonWebToken, Lodash, Axios, MongoDB & Mongoose.
            </p>
            <p className="mt-3 mb-4 txtGrey">
              <span className="fw-bold">Additional Features Are:</span> C.R.U.D
              Operations, Protected Routes (Guards), Database Analysis, User
              Authentiction, Custom API Service.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;
