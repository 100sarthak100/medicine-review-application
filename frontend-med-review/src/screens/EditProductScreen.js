import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../action/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";
import Filebase from "react-file-base64";
const EditProductScreen = ({ match, history }) => {
  const productId = match.params.id;

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

  const productDetail = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: PRODUCT_UPDATE_RESET,
      });
      history.push("/admin/listProducts");
    } else {
      if (!product.productName || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setProductName(product.productName);
        setCompanyName(product.companyName);
        setCategory(product.category);
        setDetails(product.productDetails);
        setPrice(product.price);
        setIngredients(product.ingredients);
        setQuantity(product.quantity);
        setDirectionForUse(product.directionForUse);
        setBenefits(product.benefits.join(","));
        setSafetyInfo(product.safetyInfo.join(","));
        setFile(product.productImage);
      }
    }
  }, [product, dispatch, productId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`Submitting`);
    const b = benefitsString.split(",");
    const s = safetyInfoString.split(",");
    const newProduct = {
      _id: productId,
      productName,
      companyName,
      productDetails,
      productImage,
      price,
      quantity,
      directionForUse,
      benefits: b,
      ingredients,
      safetyInfo: s,
      category,
    };

    dispatch(updateProduct(newProduct));

    console.log(JSON.stringify(newProduct));
  };

  return (
    <>
      {loading ? (
        <div class="spinner-border spinner spinner-border text-warning spinner-border-lg"></div>
      ) : (
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
                        value={productName}
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
                        value={companyName}
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
                        value={category}
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
                        value={productDetails}
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
                        value={price}
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
                        value={quantity}
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
                        value={ingredients}
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
                        value={directionForUse}
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
                        value={benefitsString}
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
                        value={safetyInfoString}
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
                        value="Update Product"
                        className="btn btn-success"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProductScreen;
