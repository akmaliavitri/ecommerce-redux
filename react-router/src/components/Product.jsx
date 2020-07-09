import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import  {getProduct, deleteProduct}  from '../store/action/product';
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert"

const Product = () => {
  // const [products, setproducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();
  const { products } = useSelector(state => state.productReducer)
  
  useEffect(() => {
    // getProduct();
    dispatch(getProduct());
  }, []);
  
  const destroyProduct = (id) => {
      
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteProduct(id))
          swal("Poof! Your data has been deleted!", {
            icon: "success",
          });
          dispatch(getProduct());
        } else {
          swal("cancel delete data");
        }
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
            <div className="productList">
              {products.length === 0 ? (
                <div>Product is Empty</div>
              ) : (
                products.map((product, index) => (
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
