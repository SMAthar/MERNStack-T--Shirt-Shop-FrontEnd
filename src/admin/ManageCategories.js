import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getCategories, deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.err) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
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
      description="Manage your categories here!"
      className="container bg-success p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-dark btn-md mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-sm-12">
          <h2 className="text-center text-white my-3">
            Total {categories.length} categories
          </h2>
          {categories.map((category, index) => {
            return (
              <div key={index} className="row text-center mb-2">
                <div className="col-sm-8">
                  <h4 className="text-white text-left">{category.name}</h4>
                </div>
                <div className="col-sm-2">
                  <Link
                    to={`/admin/category/update/${category._id}`}
                    className="btn btn-success rounded"
                  >
                    Update
                  </Link>
                </div>
                <div className="col-sm-2">
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                    className="btn btn-danger rounded"
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

export default ManageCategories;
