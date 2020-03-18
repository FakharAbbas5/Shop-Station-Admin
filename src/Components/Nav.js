import React from "react";
import logo1 from "../logo1.png";
import "../Stylesheets/Nav.css";
import { Link } from "react-router-dom";
function Nav() {

  const SignOut = () => {
    const UserDetails = JSON.parse(sessionStorage.getItem("UserDetails"));
    if (!UserDetails) {
      console.log("You Are Signed Out")
    }
    else {
      sessionStorage.removeItem("UserDetails")
      console.log(JSON.parse(sessionStorage.getItem("UserDetails")));
    }
  }
  return (
    <div className="Nav-outer-Container">
      <div className="Nav-Logo-Container">
        <img src={logo1} alt="" />
      </div>
      <div className="Nav-Links">
        <div className="Link-Container">
          <Link
            to="/addproduct"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span>Add Product</span>
          </Link>
        </div>
        <div className="Link-Container">
          <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
            {" "}
            <span> Orders</span>
          </Link>
        </div>
        <div className="Link-Container">
          <Link to="/sales" style={{ textDecoration: "none", color: "white" }}>
            <span>Sales</span>
          </Link>
        </div>
        <div className="Link-Container" onClick={SignOut}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span> Sign Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
