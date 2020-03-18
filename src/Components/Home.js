import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Axios from "axios";
import "../Stylesheets/Home.css";
import { Link, Redirect } from "react-router-dom";
function Home() {
  const UserDetails = JSON.parse(sessionStorage.getItem("UserDetails"));
  console.log(UserDetails);
  const [orders, setOrders] = useState([]);
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    if (!UserDetails) {
      console.log("Not Logged In");
      setRedirect(true);
    }
    else {
      Axios.get("http://localhost:3001/orders", {
        headers: {
          Authorization: `Bearer ${UserDetails.token}`
        }
      }).then(res => {
        // console.log(res.data);
        setOrders(res.data);
      });
    }
  }, []);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }
  return (
    <div className="Home-Main-Container">
      {renderRedirect()}
      <Nav></Nav>
      <div className="orders-outer-container">
        <div className="orders-headings-container">
          <div className="order_id">
            <h3>Order Id</h3>
          </div>
          <div className="order_by">
            <h3>Order By</h3>
          </div>
          <div className="order_email">
            <h3>Email</h3>
          </div>
          <div className="order_contact">
            <h3>Contact</h3>
          </div>
          <div className="order_shipping_address">
            <h3>Shipping Address</h3>
          </div>
        </div>
        {orders.map(order => (
          <div className="order-container" key={order._id}>
            <div className="order_id">{order._id}</div>
            <div className="order_by">{order.fullname}</div>
            <div className="order_email">{order.email}</div>
            <div className="order_contact">{order.contact}</div>
            <div className="order_shipping_address">
              {order.shippingAddress}
            </div>
            <div className="order-view-button">
              <Link
                to={{
                  pathname: "/orderdetails",
                  state: order
                }}
              >
                <button style={{ cursor: "pointer" }}>View</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
