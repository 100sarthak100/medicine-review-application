import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filebase from "react-file-base64";
import { createProduct } from "../action/productActions";
const CreateProduct = ({ history }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [productImage, setFile] = useState("");
  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [productDetails, setDetails] = useState("");
  const [price, setPrice] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [benefitsString, setBenefits] = useState("");
  const [safetyInfoString, setSafetyInfo] = useState("");
  const [directionForUse, setDirectionForUse] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: createSuccess,
    loading: createLoading,
    error: createError,
  } = productCreate;

  useEffect(() => {
    if (createSuccess) {
      alert("Product Created..");
      history.push("/admin/listProducts");
    }
    if (user === null || user.result.isAdmin === false) {
      history.push("/");
    }
  }, [createSuccess, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    const benefits = benefitsString.split(",");
    const safetyInfo = safetyInfoString.split(",");
    const product = {
      productName,
      companyName,
      price,
      category,
      productDetails,
      quantity,
      benefits,
      safetyInfo,
      ingredients,
      directionForUse,
      productImage,
      reviews: [],
    };
    console.log(`Submitted`);
    console.log(JSON.stringify(product));

    dispatch(createProduct(product));
  };

  return (
    <>
      <h1 className="m-3">Create a new product</h1>
      <div className="container mt-3">
        <div className="row">
          <form onSubmit={submitHandler}>
            <div className="col">
              <div className="jumbotron">
                <div className="form-group">
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    placeholder="Enter Product Name*"
                    className="form-control w-75"
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="company-name"
                    id="company-name"
                    placeholder="Enter Manufacturer Name*"
                    className="form-control w-75"
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Enter Category*"
                    className="form-control w-75"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    type="text"
                    name="Details"
                    id="Details"
                    rows="10"
                    placeholder="Enter Product Details / Description*"
                    className="form-control w-75"
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="MRP"
                    id="MRP"
                    placeholder="Enter MRP*"
                    className="form-control w-75"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="qty"
                    id="qty"
                    placeholder="Enter Quantity in pack / box*"
                    className="form-control w-75"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="ingredients"
                    id="ingredients"
                    placeholder="Enter ingredients*"
                    className="form-control w-75"
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    type="text"
                    name="direction-for-use"
                    id="direction-for-use"
                    placeholder="Enter directios fors use *"
                    className="form-control w-75"
                    onChange={(e) => setDirectionForUse(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    type="text"
                    name="benefits"
                    id="benefits"
                    placeholder="Enter benefits (comma seperated)*"
                    className="form-control w-75"
                    onChange={(e) => setBenefits(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    type="text"
                    name="safety-info"
                    id="safety-info"
                    placeholder="Enter safety-info (comma seperated)*"
                    className="form-control w-75"
                    onChange={(e) => setSafetyInfo(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <Filebase
                    className="form-control"
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setFile(base64)}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value="Create new Product"
                    className="btn btn-success"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
