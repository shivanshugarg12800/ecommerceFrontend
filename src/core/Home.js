import React, { useState, useEffect } from "react";
import "../styles.css";
import BASE from "./Base";
import Card from "./card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <BASE title="PRODUCTS" description="Welcome to our Store">
      {/*whatever goes in here comes under the children in the base.js */}
      <div className="row text-center justify-content-around">
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className="col-12 col-sm-6 col-lg-4 mb-4 card-deck"
            >
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </BASE>
  );
};
export default Home;
