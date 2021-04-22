import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base
      title="Welcome Admin"
      description="Manage your products here"
      className="container bg-success p-4"
    >
      <Link to="/admin/dashboard" 
      className="btn btn-dark btn-md mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {products.length} Products </h2>
          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2">
                <div className="col-8">
                  <h4 className="text-white text-left">{product.name}</h4>
                </div>
                <div className="col-2">
                  <Link
                    className="btn btn-success rounded"
                    to={`/admin/product/update/${product._id}`}
                  >
                    Update
                  </Link>
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-danger rounded"
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
