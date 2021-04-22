import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if(data){
        setName(data.name)
      }else{
        console.log("No Data found")
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError(false);
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Updated successfully</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to Update category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            autoFocus
            required
            placeholder="For Ex. Summer"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
          />
          <button onClick={onSubmit} className="btn btn-outline-success">
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirt"
      className="container bg-success p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {/* {goBack()} */}
          {myCategoryForm()}
          {successMessage()}
          {errorMessage()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
