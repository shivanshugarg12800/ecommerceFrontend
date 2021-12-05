import React, { useState, useEffect } from "react";
import BASE from "../core/Base";
import { Link } from "react-router-dom";
import { getOneProduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
    error: "",
    createdProduct: "",
    formData: "",
  });

  const { name, description, price, error, createdProduct, formData } = values; // destructuring the values

  // to preload the stuff of the selected product..
  const preload = (productId) => {
    getOneProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          formData: new FormData(),
        });
      }
    });
  };
  // match is a prop that can be used to extract the params from the URL
  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(user._id, token, match.params.productId, formData).then(
      (data) => {
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
            createdProduct: data.name,
          });
        }
      }
    );
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
      <h4>{createdProduct}Updated successfully</h4>
    </div>
  );
  const errorMessage = () => {
    if (error) {
      return (
        <div className="alert alert-success mt-3">
          <h4>Product cannot be updated!!</h4>
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
      <button type="submit" onClick={onSubmit} className="btn btn-info mb-3">
        Update Product
      </button>
    </form>
  );

  return (
    <BASE
      title="Product"
      description="Welcome to product Updation section"
      className="container p-4"
    >
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
    </BASE>
  );
};
export default UpdateProduct;
