import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { addChart } from "../store/action/chart";

const Chart = (props) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { state } = useLocation();
  const product = state.product;

  const handleSubmit = (id) => {

    console.log(id, " id submit")
    
    const postProduct = {
      quantity: quantity,
    };

    dispatch(addChart(postProduct, id));
    setQuantity(1);
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="container-regis ">
          <div className="container px-lg-5 d-flex justify-content-center align-items-center">
            <div
              className="row mx-lg-n5"
              style={{ backgroundColor: "#FF613A" }}
            >
              <div className="col py-3 px-lg-5 border">
                <img
                  id="signupimg"
                  src={product.image_url}
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="col py-3 px-lg-5 border">
                <div className="colregis">
                  <div className="card p-4">
                    <div className="form-gorup">
                      <label> Product Name :</label>
                      <input
                        className="form-control"
                        value={product.name}
                        disabled={true}
                      />
                    </div>

                    <div className="form-gorup">
                      <label> Price :</label>
                      <input
                        className="form-control"
                        value={product.price}
                        disabled
                      />
                    </div>

                    <div className="form-gorup">
                      <label> Stock :</label>
                      <input
                        className="form-control"
                        value={product.stock}
                        disabled={true}
                      />
                    </div>
                    <br />

                    <div>
                      <Link to="/product">
                        <button className="btn btn-success">
                          <i>Back</i>
                        </button>
                      </Link>{" "}
                      <Link
                        to={{
                          pathname: "/myChart",
                          state: {
                            product: product,
                          },
                        }}
                      >
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSubmit(product._id)}
                        >
                          Add to chart
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
