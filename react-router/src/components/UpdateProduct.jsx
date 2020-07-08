import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { updateProduct } from "../store/action/product";

const UpdateProduct = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImage_url] = useState("");

  let history = useHistory();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeStock = (e) => {
    setStock(e.target.value);
  };

  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const onChangeImage = (e) => {
    setImage_url(e.target.value);
  };

  const handleSubmit = () => {
    const { id } = props.match.params;

    const dataUpdate = {
      name,
      price,
      stock,
      image_url,
    };

    dispatch(updateProduct(dataUpdate, id));
    history.push("/product");
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="container-update">
          <div className="container-updateProduct">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div
                  className="card p-4"
                  style={{ backgroundColor: "#FF613A" }}
                >
                  <h2>Update Product</h2>
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
                      onChange={onChangeImage}
                    />
                  </div>
                  <br />
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
