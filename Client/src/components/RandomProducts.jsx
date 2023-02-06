import React, { useState } from "react";
import { getAllProducts } from "../services/productsService";
import Card from "./Card";

function RandomProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.data);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const shuffledArray = products.sort(() => Math.random() - 0.5);
  const selectedElements = shuffledArray.slice(0, 8);

  return (
    <>
      {isLoading ? (
        <>
          <div className="container"></div>
          <hr className="mt-2" />
          <h1 className="boldTitle text-center mb-3">
            <span className="tapered2 responsiveTitle">
              Customers Also Viewed
            </span>
          </h1>
          <div className="products mt-1">
            {selectedElements.map((product) => {
              return (
                <Card
                  _id={product._id}
                  hot={product.hot}
                  image={product.image}
                  category={product.category}
                  description={product.description}
                  rate={product.rate}
                  name={product.name}
                  price={product.price}
                  inStock={product.inStock}
                  key={product._id}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default RandomProducts;
