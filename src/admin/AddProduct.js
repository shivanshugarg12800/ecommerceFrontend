import React, { useState } from "react";
import BASE from "../core/Base";
import { Link } from "react-router-dom";
import { createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
    error: "",
    createdProduct: "",
    formData: new FormData(),
  });

  const { name, description, price, error, createdProduct, formData } = values; // destructuring the values

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          error: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );
  const errorMessage = () => {
    if (error) {
      console.log(error);
      return (
        <div className="alert alert-success mt-3">
          <h4>Product cannot be created !!</h4>
        </div>
      );
    }
  };

  const createProductForm = () => (
    <form>
      <span className="font-weight-semi-bold">Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-info">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-info mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <BASE title="Product" description="Welcome to product creation section">
      <div className="container p-4">
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
          Admin Home
        </Link>
        <div className="row text-white rounded justify-content-md-center">
          <div className="col-12 col-sm-8 shadow">
            {errorMessage()}
            {successMessage()}
            {createProductForm()}
          </div>
        </div>
      </div>
    </BASE>
  );
};
export default AddProduct;
