import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Nav from "./Nav";
import "../Stylesheets/OrderDetails.css";
import Button from "./Button";
import ModalDispatched from "./ModalDispatched";
import { StoreContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
function OrderDetails(props) {
  console.log(props.location.state);
  const StoreData = useContext(StoreContext);
  const dispatchModal = useSelector(state => state);
  console.log(dispatchModal);
  const dispatchModalState = useDispatch();
  const [products, setProducts] = useState([]);
  const { OpenDispatchedModal } = StoreData;
  const [redirect, setRedirect] = useState(false)
  const UserDetails = JSON.parse(sessionStorage.getItem("UserDetails"));
  console.log(UserDetails);
  useEffect(() => {

    if (!UserDetails) {
      setRedirect(true);
    }

    else {
      Axios.get(
        `http://localhost:3001/order/products/${props.location.state._id}`
      ).then(res => {
        console.log(res);
        setProducts(res.data);

      });
    }

  }, []);
  const dispatch = async () => {
    console.log(products);
    var index = 0;
    const promises = products.map(async product => {
      const response = await Axios.get(
        `http://localhost:3001/product/category/${product.product_category}`
      );
      const productObj = {
        product_id: product._id,
        category: response.data,
        quantity: props.location.state.products[index].quantity,
        sale_price:
          product.product_unit_price *
          props.location.state.products[index].quantity
      };
      index++;
      return productObj;
    });
    Promise.all(promises).then(async response => {
      const salesResponse = await Axios.post(
        "http://localhost:3001/sales",
        response
      );
      console.log(salesResponse);
      if (salesResponse.status == 200) {
        await Axios.delete(
          `http://localhost:3001/orders/${props.location.state._id}`
        );

        var index = 0;
        const productsToBeUpdated = products.map(product => {
          const obj = {
            product_id: product._id,
            quantity: props.location.state.products[index].quantity
          };
          index++;
          console.log(obj.quantity);
          return obj;
        });
        console.log(productsToBeUpdated);
        const updatedResponse = await Axios.patch(
          "http://localhost:3001/products",
          productsToBeUpdated
        );
        console.log(updatedResponse);
        dispatchModalState({ type: "ShowDispatchedModal" });
      }
    });
    // console.log(arr);
  };
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }
  return (
    <div className="order-details-outer-container">
      {renderRedirect()}
      <Nav />
      {dispatchModal ? <ModalDispatched /> : null}
      <div className="order-detail-inner-container">
        {products.map(product => (
          <div className="order-details-product" key={product._id}>
            <img src={product.product_image} />
            <h4>{product.product_name}</h4>
            <h5>By:{product.product_brand}</h5>
          </div>
        ))}
      </div>
      <div className="dispatch-order-container">
        <h3>Total Amount:₹{props.location.state.total}</h3>
        <div className="order-details-button">
          <Button onClick={dispatch}>Dispatch</Button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
