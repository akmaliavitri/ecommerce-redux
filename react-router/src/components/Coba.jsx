import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getProduct();
  }, [productList.length]);

  const getProduct = async () => {
    setIsFetching(true);

    const {
      data: { data },
    } = await axios.get("http://localhost:4000/product", {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    if (data) {
      setIsFetching(false);
    }
    setProductList(data);
  };

  const destroyProduct = (_id) => {
    axios
      .delete(`http://localhost:4000/product/delete/${_id}`, {
        headers: { access_token: localStorage.getItem("access_token") },
      })
      .then((result) => {
        getProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!localStorage.getItem("access_token")) {
    return <Redirect to="/signin" />;
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="cardProduct  justify-content-center align-items-center">
          <h2>Product List</h2>

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
            <div className="productList ">
              {productList.length === 0 ? (
                <div>
                  <h1>Product is Empty</h1>
                </div>
              ) : (
                productList.map((product, index) => (
                  <div className="card " key={index}>
                    <img
                      src={product.image_url}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text" style={{ color: "#FF613A" }}>
                        Rp. {product.price}
                      </p>
                      <p className="card-text">{product.stock}</p>

                      <div>
                        <Link to={"/product/update/" + product._id}>
                          <button className="btn btn-primary" id="nav-btn-add">
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            >
                              {/* Update */}
                            </i>
                          </button>
                        </Link>{" "}
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => destroyProduct(product._id)}
                        >
                          <i className="fa fa-trash" aria-hidden="true">
                            {" "}
                            {/* Delete */}
                          </i>{" "}
                        </button>
                        <Link
                          to={{
                            pathname: `/detailProduct`,
                            state: {
                              product: product,
                            },
                          }}
                        >
                          <button className="btn btn-primary" id="nav-btn-add">
                            <i
                              className="fa fa-cart-plus fa"
                              id="nav-add-chart"
                              aria-hidden="true"
                            >
                              {/* Detail */}
                            </i>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
