import React, { useState, Fragment } from "react";
import { useLocation, Redirect, useHistory} from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch } from 'react-redux'
import { checkoutChart, getChart} from '../store/action/chart'

const CheckOut = () => {
  const { state } = useLocation();
  const item = state.item;
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()

  const checkout = (id, quantity) => {
    dispatch(checkoutChart(id, quantity))
    dispatch(getChart())
    setRedirect(true)
    // history.push('/myChart')
  }

  return (
    <Fragment>
      {redirect && <Redirect to="/myChart" />}
      <Navbar />

      <div>
        <div className="container-regis">
          <div className="container ">
            <div className="col py-3 px-lg-5 px-lg-5 d-flex justify-content-center align-items-center">
              <div
                className="row mx-lg-n5"
                style={{ backgroundColor: "#FF613A" }}
              >
                <div className="col py-3 px-lg-5 border">
                  <img
                    id="signupimg"
                    src={item.product.image_url}
                    className="imagecheckout"
                    alt="..."
                  />
                </div>
                <div className="col py-3 px-lg-5 border">
                  <div className="colregis">
                    <div className="card p-4">
                      <div className="form-gorup">
                        <label> Product Name :</label>
                        <input
                          disabled={true}
                          className="form-control"
                          value={item.product.name}
                        />
                      </div>
                      <div className="form-gorup">
                        <label> Price :</label>
                        <input
                          disabled={true}
                          className="form-control"
                          value={item.product.price}
                        />
                      </div>
                      <div className="form-gorup">
                        <label> Stock :</label>
                        <input
                          disabled={true}
                          className="form-control"
                          value={item.product.stock - item.quantity}
                        />
                      </div>
                      <div className="form-gorup">
                        <label> Quantity :</label>
                        <input
                          disabled={true}
                          className="form-control"
                          value={item.quantity}
                        />
                      </div>{" "}
                      <br />
                      <div>
                        <button className="btn btn-primary">
                          <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                            onClick={() =>
                              checkout(item.product._id, item.quantity)
                            }
                          >
                            Checkout
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckOut;
