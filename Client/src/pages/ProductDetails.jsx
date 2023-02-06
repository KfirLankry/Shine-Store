import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChoosenProduct from "./ChoosenProduct";
import RandomProducts from "../components/RandomProducts";
import Loading from "../components/Loading";

function ProductDetails() {
  const { id } = useParams();
  const api = import.meta.env.VITE_API_BASE_URL || "";
  const [products] = useFetch(`${api}products/${id}`);
  const [isLoading, setIsLoading] = useState(false);
  const [cartChange, setCartChange] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
  }, []);
  return (
    <>
      <Navbar cartChange={cartChange} />
      {isLoading ? (
        <div className="container main">
          <ChoosenProduct
            products={products}
            setCartChange={setCartChange}
            cartChange={cartChange}
          />
          <RandomProducts />
        </div>
      ) : (
        <Loading />
      )}

      <Footer />
    </>
  );
}

export default ProductDetails;
