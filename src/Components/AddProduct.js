import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import "../Stylesheets/AddProduct.css";
import Button from "./Button";
import Axios from "axios";
import ModalAdded from "./ModalAdded";
import { StoreContext } from "../App";
function AddProduct() {
  const StoreData = useContext(StoreContext);
  console.log(StoreData);
  const { modalOpen, OpenMyModal, CloseMyModal } = StoreData;
  const [product_name, setProductName] = useState("");
  const [product_unit_price, setProductUnitPrice] = useState("");
  const [product_brand, setProductBrand] = useState("");
  const [product_category, setProductCategory] = useState("");
  const [product_color, setProductColor] = useState("");
  const [product_quantity, setProductQuantity] = useState("");
  const [product_image, setProductImage] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_name_error, setProductNameError] = useState("");
  const [product_unit_price_error, setProductUnitPriceError] = useState("");
  const [product_brand_error, setProductBrandError] = useState("");
  const [product_category_error, setProductCategoryError] = useState("");
  const [product_color_error, setProductColorError] = useState("");
  const [product_quantity_error, setProductQuantityError] = useState("");
  const [product_image_error, setProductImageError] = useState("");
  const [product_description_error, setProductDescriptionError] = useState("");
  const changeHandler = event => {
    switch (event.target.name) {
      case "Name":
        setProductName(event.target.value);
        console.log(event.target.value);
        event.target.value.length < 1
          ? setProductNameError("Please Enter Product Name")
          : setProductNameError("");
        return;
      case "Brand":
        setProductBrand(event.target.value);
        console.log(event.target.value);
        event.target.value.length < 1
          ? setProductBrandError("Please Enter Product Brand")
          : setProductBrandError("");
        return;
      case "Price":
        setProductUnitPrice(event.target.value);
        console.log(event.target.value);
        event.target.value < 1
          ? setProductUnitPriceError("Please Enter Positive Value")
          : setProductUnitPriceError("");
        return;
      case "Category":
        setProductCategory(event.target.value);
        console.log(event.target.value);
        event.target.value == "Electronics" ||
        event.target.value == "Fashion" ||
        event.target.value == "Grocery" ||
        event.target.value == "Books"
          ? setProductCategoryError("")
          : setProductCategoryError("Please Provide Some Category");
        return;
      case "Color":
        setProductColor(event.target.value);
        console.log(event.target.value);
        event.target.value.length < 2
          ? setProductColorError("Please Prodive some valid color")
          : setProductColorError("");
        return;
      case "Quantity":
        setProductQuantity(event.target.value);
        console.log(event.target.value);
        event.target.value < 1
          ? setProductQuantityError("Please Enter Positive Value")
          : setProductQuantityError("");
        return;
      case "Image":
        setProductImage(event.target.files[0]);
        console.log(event.target.files[0]);
        return;
      case "Description":
        setProductDescription(event.target.value);
        console.log(event.target.value);
        event.target.value.length < 4
          ? setProductDescriptionError("Please Enter Description")
          : setProductDescriptionError("");
        return;
    }
  };

  useEffect(() => {
    console.log(
      product_brand_error,
      product_category_error,
      product_color_error,
      product_description_error,
      product_image_error,
      product_name_error,
      product_quantity_error,
      product_unit_price_error
    );
  }, [
    product_brand_error,
    product_category_error,
    product_color_error,
    product_description_error,
    product_image_error,
    product_name_error,
    product_quantity_error,
    product_unit_price_error
  ]);

  const formValid = () => {
    var valid = true;
    if (
      product_name_error.length > 0 ||
      product_brand_error.length > 0 ||
      product_unit_price_error.length > 0 ||
      product_category_error.length > 0 ||
      product_color_error.length > 0 ||
      product_quantity_error.length > 0 ||
      product_image_error.length > 0 ||
      product_description_error.length > 0 ||
      product_name == "" ||
      product_brand == "" ||
      product_unit_price == "" ||
      product_quantity == "" ||
      product_color == "" ||
      product_description == "" ||
      product_image == "" ||
      product_category == ""
    ) {
      valid = false;
    }
    return valid;
  };

  const submitHandler = async event => {
    event.preventDefault();
    const valid = formValid();
    if (valid) {
      const UserDetails = JSON.parse(sessionStorage.getItem("UserDetails"));
      const token = UserDetails.token;
      const fd = new FormData();
      fd.append("product_name", product_name);
      fd.append("product_unit_price", product_unit_price);
      fd.append("product_brand", product_brand);
      fd.append("product_category", product_category);
      fd.append("product_color", product_color);
      fd.append("product_description", product_description);
      fd.append("product_quantity", product_quantity);
      fd.append("product_image", product_image, product_image.name);
      const product = await Axios.post("http://localhost:3001/products", fd);
      console.log(product);
      if (product.status == 201) {
        OpenMyModal();
      }
    }
  };

  return (
    <div className="add-product-main-container">
      <Nav />
      {modalOpen ? <ModalAdded></ModalAdded> : null}

      <div className="add-product-outer-container">
        <div className="add-product-form-container">
          <div className="add-product-heading">
            <h2>Add Product</h2>
          </div>

          <div className="form-inner-container">
            <div className="add-product-label">
              <label>Name</label>
            </div>
            <div className="add-product-input">
              <input type="text" name="Name" onChange={changeHandler} />
            </div>
          </div>

          <div className="form-inner-container">
            <div className="add-product-label">
              <label>Brand</label>
            </div>
            <div className="add-product-input">
              <input type="text" name="Brand" onChange={changeHandler} />
            </div>
          </div>

          <div className="form-inner-container">
            <div className="add-product-label">
              <label>Price</label>
            </div>
            <div className="add-product-input">
              <input type="Number" name="Price" onChange={changeHandler} />
            </div>
          </div>

          <div className="form-inner-container">
            <div className="add-product-label">
              <label>Category</label>
            </div>
            <div className="add-product-input">
              <select
                onChange={changeHandler}
                name="Category"
                style={{
                  width: "73%",
                  border: "1px solid var(--theme",
                  borderRadius: "5px"
                }}
              >
                <option value="Select Me">Select Category--</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Books">Books</option>
                <option value="Grocery">Grocery</option>
              </select>
            </div>
          </div>

          <div className="form-inner-container">
            <div className="add-product-label">
              <label>Color</label>
            </div>
            <div className="add-product-input">
              <input type="text" name="Color" onChange={changeHandler} />
            </div>
          </div>

          <div className="form-inner-container">
            <div className="add-product-label">
              <label>Quantity</label>
            </div>
            <div className="add-product-input">
              <input type="Number" name="Quantity" onChange={changeHandler} />
            </div>
          </div>

          <div className="form-inner-container">
            <div className="add-product-label">
              <label>Image</label>
            </div>
            <div className="add-product-input">
              <input type="file" name="Image" onChange={changeHandler} />
            </div>
          </div>
          <div className="form-inner-container">
            <div className="add-product-label">
              <label>Description</label>
            </div>
            <div className="add-product-input">
              <textarea
                name="Description"
                style={{
                  width: "71%",
                  resize: "none",
                  height: "100px",
                  border: "1px solid var(--theme)",
                  borderRadius: "10px",
                  outline: "none"
                }}
                onChange={changeHandler}
              ></textarea>
            </div>
          </div>
          <div className="add-product-Button">
            <Button onClick={submitHandler}>Add Book</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
