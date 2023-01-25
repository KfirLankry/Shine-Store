import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/cart.css";
import "../css/successBtn.css";
import {
  getProductsInCart,
  deleteProducts,
  deleteProductFromCart,
} from "../services/cartService";
import { errorMsg, successMsg } from "../services/feedbackService";
import Loading from "../components/Loading";

function Cart() {
  const [products, setProducts] = useState([]);
  const isLogged = sessionStorage.getItem("token");

  // Updates Cart Badge After Deleting Product From Cart
  const [isChanged, setIsChanged] = useState(false);
  const [cart, setCart] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const tax = 15;
  const sum = cart ? cart.reduce((total, item) => total + item.price, 0) : null;

  // Delete Products in cart
  const handleDelete = () => {
    setTimeout(() => {
      deleteProducts(cart)
        .then(() => {
          successMsg("Payment Successfull!");
          setIsChanged(!isChanged);
        })
        .catch((err) => errorMsg("Something went wrong! Please try agian."));
    }, 3000);
  };

  const handleDeleteProductFromCart = (product) => {
    deleteProductFromCart(product)
      .then(() => {
        successMsg(`Product deleted Successfully!`);
        setIsChanged(!isChanged);
      })
      .catch((err) => {
        errorMsg("Something went wrong! Please Try Again.");
      });
  };

  React.useEffect(() => {
    if (isLogged) {
      getProductsInCart()
        .then((result) => {
          setCart(result.data);
          setIsLoading(true);
        })
        .catch((err) => {
          errorMsg("Something went wrong! Please Try Again.");
        });
    } else {
      setIsLoading(true);
    }
  }, [isChanged]);

  return (
    <>
      <Navbar cartRender={isChanged} />
      {isLoading ? (
        <div className="container">
          <h1 className="boldTitle text-center pt-3 pb-3">
            <span className="title">Products in Bag</span>
          </h1>
          {cart.length ? (
            <div className="px-4 px-lg-0">
              <div className="pb-5">
                <div className="container">
                  <div className="row p-4 bg-white cartContainer rounded shadow-sm mt-3">
                    <div className="col-lg-12">
                      <div className="container cart-page mb-4">
                        <table className="w-100">
                          <tbody>
                            <tr className="text-center bg-light text-uppercase cartContainer2">
                              <th className="w-50 th">Item</th>
                              <th className="th">Size</th>
                              <th className="th">Qty</th>
                              <th className="th">Price</th>
                              <th className="th"></th>
                            </tr>
                            {cart.map((product) => {
                              return (
                                <tr className="fw-bold" key={product._id}>
                                  <td>
                                    <div className="cart-info">
                                      <img
                                        className="rounded"
                                        src={product.image}
                                        alt="Product"
                                      />

                                      <div className="prodName">
                                        <h6 className="dots">{product.name}</h6>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    {product.size}
                                  </td>
                                  <td className="text-center">
                                    {product.quantity}
                                  </td>
                                  <td className="text-center ">
                                    {product.price} ₪
                                  </td>
                                  <td
                                    onClick={() =>
                                      handleDeleteProductFromCart(product)
                                    }
                                  >
                                    <i className="fa-solid fa-xmark text-danger fa-lg"></i>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <hr />
                      <div className="bg-light px-4 py-2 mt-4 text-uppercase fw-bold cartContainer2">
                        Order summary{" "}
                      </div>
                      <div className="p-4">
                        <p className="font-italic mb-4 cartItemName">
                          Shipping and additional costs are calculated based on
                          values you have entered.
                        </p>
                        <ul className="list-unstyled mb-4">
                          <li className="d-flex justify-content-between py-3 border-bottom">
                            <strong className="text-muted">
                              Order Subtotal{" "}
                            </strong>
                            <h5 className="cartItemName">{sum}.00 ₪</h5>
                          </li>

                          <li className="d-flex justify-content-between py-3 border-bottom">
                            <strong className="text-muted">
                              Tax & Shipping
                            </strong>
                            <h5 className="cartItemName">{tax}.00 ₪</h5>
                          </li>
                          <li className="d-flex justify-content-between py-3 border-bottom">
                            <strong className="text-muted">Total</strong>
                            <h5 className="fw-bold cartItemName">
                              {sum + tax}.00 ₪
                            </h5>
                          </li>
                        </ul>
                        <div className="payBtn text-center">
                          <button
                            className="noselect"
                            onClick={() => handleDelete(products)}
                          >
                            <span className="payNow">
                              <i className="fa-solid fa-credit-card mx-1"></i>{" "}
                              Pay Now
                            </span>
                            <svg
                              className="svg"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="cartMessage text-center">
              <h4 className="text-center mt-3">Your Bag is Empty...</h4>
              {!isLogged ? (
                <h6 className="text-center">
                  Please Login to view your cart and start shopping.
                </h6>
              ) : null}
              <img
                className="cartImg img-fluid mb-4"
                src="cart.png"
                alt="png"
              />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}

      <Footer />
    </>
  );
}

export default Cart;
