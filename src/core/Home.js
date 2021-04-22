import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <h1 className="text-white">All of TShirts</h1>
      <div className="row text-center">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-sm-3 mb-4">
              <Card product={product}/>
            </div>
          );
        })}
      </div>
    </Base>
  );
}
