import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // console.log(props.token)
  const logout = () => {
    localStorage.clear("access_token");
  };

  const [show, setShow] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      setShow(true);
    }
  }, [token]);

  return (
    <div>
      <div className="navbar-div">
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#FF613A" }}
        >
          <p className="navbar-brand">Ecommerce</p>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <Link to="/product">
                <li className="nav-item active">
                  <p className="nav-link">Product</p>
                </li>
              </Link>
            </ul>

            <div className="nav-addProduct">
              <Link to="/product/add">
                <button className="btn btn-light" id="nav-btn-add">
                  Add Product
                </button>
              </Link>
            </div>

            {show && (
              <div className="nav-chart">
                <Link to="/myChart">
                  <button className="btn btn-light" id="nav-btn-add">
                    <i
                      className="fa fa-cart-plus "
                      id="nav-add-chart"
                      aria-hidden="true"
                    ></i>
                  </button>
                </Link>
              </div>
            )}

            {show && (
              <div className="nav-logout">
                <Link to="/signin">
                  <button
                    className="btn btn-dark"
                    id="nav-btn-logout"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
