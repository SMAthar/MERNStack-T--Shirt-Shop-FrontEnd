import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              className="nav-link text-success"
              to="/admin/create/category"
            >
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link text-success"
              to="/admin/categories"
            >
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/products">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/create/orders">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2 p-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2 p-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger mr-2 p-2"> Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row bg-dark rounded p-3 mt-5">
        <div className="col-sm-3">{adminLeftSide()}</div>
        <div className="col-sm-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
