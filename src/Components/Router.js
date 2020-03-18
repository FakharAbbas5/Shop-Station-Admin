import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import SignIn from "./SignIn";
import Home from "./Home";
import AddProduct from "./AddProduct";
import OrderDetails from "./OrderDetails";
import Sales from "./Sales";
function Router() {
  const renderRedirect = () => {
    return <Redirect to="/signin" />;
  };
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/home" exact component={Home} />
          <Route path="/addproduct" exact component={AddProduct} />
          <Route path="/orderdetails" exact component={OrderDetails} />
          <Route path="/sales" exact component={Sales} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
