import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import { getChart, deleteItemChart } from '../store/action/chart'
import {useDispatch, useSelector} from 'react-redux'

const MyChart = () => {
  // const [chartItems, setChartItems] = useState([]);
  const [chartId, setChartId] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isFetching, setIsFatching] = useState(false);

  const dispatch = useDispatch()
  const { myCharts } = useSelector(state => state.chartReducer)

  useEffect(() => {
    dispatch(getChart())
  }, []);

  const removeItem = (id) => {
    dispatch(deleteItemChart(id))
    dispatch(getChart())
  };

  const inCreament = async (item) => {
    if (item.product.stock > 0) {
      await Axios.put(
        `http://localhost:4000/chart/increament/${chartId}/update/${item.product._id}`,
        {
          quantity,
        },
        {
          headers: { access_token: localStorage.getItem("access_token") },
        }
      );
    }
    // getItemData();
  };

  const decCrement = async (item) => {
    await Axios.put(
      `http://localhost:4000/chart/decrement/${chartId}/update/${item.product._id}`,
      {
        quantity,
      },
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    // getItemData();
  };

  if (!localStorage.getItem("access_token")) {
    return <Redirect to="/signin" />;
  }

  return (
    <>
      <Navbar />
      <div className="myChart">
        <h2>MyChart</h2>
        <br />
        {isFetching ? (
          <div>
            <img
              src="https://thumbs.gfycat.com/UnhappyEnchantedBellsnake-small.gif"
              className="card-img-top"
              id="loadingId"
              alt="..."
            />
          </div>
        ) : (
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Image-Url</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {myCharts.length === 0 ? (
                <tr>
                  <td colSpan="8">your chart is empty</td>
                </tr>
              ) : (
                myCharts.items.map((item, index) => (
                  <tr key={index}>
                    <th style={{ verticalAlign: "middle" }}>{index + 1}</th>
                    <td style={{ verticalAlign: "middle" }}>
                      {item.product.name}
                    </td>
                    <td>
                      <img
                        src={item.product.image_url}
                        className="card-img-top"
                        alt="..."
                      />
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      Rp. {item.product.price}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {item.product.stock - item.quantity}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{item.quantity}</td>
                    <td style={{ verticalAlign: "middle" }}>
                      Rp. {item.quantity * item.product.price}
                    </td>
                    <td>
                      <div className="btnchart">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            style={{ backgroundColor: "#FF613A" }}
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => decCrement(item)}
                          >
                            -
                          </button>
                          <div className="inputquantity">
                            <label className="inputmanual">
                              {item.quantity}
                            </label>
                          </div>
                          <button
                            style={{ backgroundColor: "#FF613A" }}
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => inCreament(item)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <br />

                        <Link
                          to={{
                            pathname: "/chart/checkout/" + item.product._id,
                            state: {
                              item: item,
                            },
                          }}
                        >
                          <button className="btn btn-primary" id="nav-btn-add">
                            <i className="fa fa-shopping-bag"></i>
                          </button>
                        </Link>

                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeItem(item.product._id)}
                        >
                          <i className="fa fa-trash" aria-hidden="true">
                            {" "}
                            {/* Delete */}
                          </i>{" "}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default MyChart;
