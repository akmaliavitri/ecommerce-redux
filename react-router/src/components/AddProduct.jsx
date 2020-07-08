import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch } from 'react-redux'
import { addProduct } from '../store/action/product'

const AddProduct = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image_url, setImage_url] = useState("");
  const [redirect, setRedirect] = useState(false);

  if (!localStorage.getItem("access_token")) {
    return <Redirect to="/signin" />;
  }

  const onChangeName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const onChangePrice = (e) => {
    const value = e.target.value;
    setPrice(value);
  };

  const onChangeStock = (e) => {
    const value = e.target.value;
    setStock(value);
  };

  const onChangeImage = (e) => {
    const value = e.target.value;
    setImage_url(value);
  };


  const handleSubmit = () => {
    const newProduct = {
      name: name,
      price: price,
      stock: stock,
      image_url: image_url,
    };

    console.log(newProduct, "new product")

    dispatch(addProduct(newProduct))
    setRedirect(true)
  };

  return (
    <Fragment>
      {redirect && <Redirect to="/product" />}
      <Navbar />
      <div>
        <div className="container-add">
          <div className="container-AddProduct">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div
                  className="card p-4"
                  style={{ backgroundColor: "#FF613A" }}
                >
                  <h2>Add product</h2>
                  <div className="form-gorup">
                    <label> Product Name :</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name-product"
                      placeholder="ex : mobil"
                      value={name}
                      onChange={onChangeName}
                    />
                  </div>

                  <div className="from-group">
                    <label>Price :</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price-product"
                      placeholder="ex : 200000"
                      value={price}
                      onChange={onChangePrice}
                    />
                  </div>

                  <div className="from-group">
                    <label>Stock :</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock-product"
                      placeholder="ex : 20"
                      value={stock}
                      onChange={onChangeStock}
                    />
                  </div>

                  <div className="from-group">
                    <label>Image URL :</label>
                    <input
                      type="text"
                      className="form-control"
                      id="image-product"
                      placeholder="ex : https://med.........1"
                      value={image_url}
                      onChange={onChangeImage}
                    />
                  </div>
                  <br />

                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddProduct;
