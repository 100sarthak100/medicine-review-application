import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductDetails } from "../action/productActions";
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  let isReviewd = [];

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    isReviewd = product.reviews.filter(
      (r) => r.reviewCreatorId === user.result._id
    );
    console.log(isReviewd.length);
  }, [dispatch, match]);

  return (
    <div>
      {loading ? (
        <>
          <div class="spinner-border spinner spinner-border text-warning spinner-border-lg"></div>
        </>
      ) : (
        <>
          <div
            className="jumbotron m-5 p-4"
            style={{ backgroundColor: "white" }}
          >
            <h3>{product.productName}</h3>
            <div className="m-4" style={{ backgroundColor: "white" }}>
              <img
                src={product.productImage}
                alt="Image"
                height="200"
                width="200"
              />
            </div>
            <div
              className="card-body text-justify"
              style={{ backgroundColor: "white" }}
            >
              <div className="card-text">
                <h3>Product Details</h3>
                <p>{product.productDetails}</p>
              </div>
            </div>
            <div style={{ backgroundColor: "white" }}>
              <span className="badge badge-pill badge-primary m-2 p-3">
                Category : {product.category}
              </span>
              <span className="badge badge-pill badge-success m-2 p-3">
                Manufactured By : {product.companyName}
              </span>
              <span className="badge badge-pill badge-dark m-2 p-3">
                Overall Rating : {product.overallRating} ★
              </span>
              <span className="badge badge-pill badge-danger m-2 p-3">
                Price : {"\u20B9 "}
                {product.price}
              </span>
              <span className="badge badge-pill badge-warning m-2 p-3">
                Quantity In pack/box: {product.quantity}
              </span>
            </div>
            <div
              className="mt-3 p-2 shadow-sm"
              style={{ backgroundColor: "white" }}
            >
              <div className="alert alert-dismissible alert-info">
                <h5>
                  <u>Direction for use</u>
                </h5>
                <strong>{product.directionForUse}</strong>
                <h5>
                  <u>Ingredients</u>
                </h5>
                <strong>{product.ingredients}</strong>
              </div>
            </div>
          </div>
          <div className="container mt-3" style={{ backgroundColor: "white" }}>
            <div className="row">
              {product.benefits && product.benefits.length > 0 && (
                <div className="col-md-6 d-flex align-items-stretch">
                  <div className="card border-primary mb-3 mt-3">
                    <div className="card-header">Benefits</div>
                    <ul>
                      <DisplayItems items={product.benefits} />
                    </ul>
                  </div>
                </div>
              )}
              {product.safetyInfo && product.safetyInfo.length > 0 && (
                <div className="col-md-6 d-flex align-items-stretch">
                  <div className="card border-primary mb-3 mt-3">
                    <div className="card-header">Info</div>
                    <ul>
                      <DisplayItems items={product.safetyInfo} />
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Review Section */}

          <section className="jumbotron m-5 p-4">
            <h1 className="text-center">User Reviews</h1>
            <div className="row">
              {user !== null && user.result._id !== null && (
                <div className="col">
                  <Link
                    className="btn btn-info p-3 m-2"
                    to={`/products/${product._id}/review`}
                  >
                    Write your review
                  </Link>
                </div>
              )}
            </div>
            {product.reviews.length > 0 && (
              <div>
                {product.reviews.map((r, index) => (
                  <div className="row">
                    <div key={index} className="col mx-auto">
                      <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
                        <div className="blockquote-custom-icon bg-info shadow-sm">
                          <i className="fa fa-quote-left text-white"></i>
                        </div>
                        <p className="mb-0 mt-2 font-italic">{r.comment}</p>
                        <br />
                        <div>
                          <span className="badge badge-pill badge-warning mt-2 p-1">
                            {r.rating} ★
                          </span>
                        </div>
                        <footer className="blockquote-footer pt-4 mt-4 border-top">
                          {r.reviewCreatorName}
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

const DisplayItems = ({ items }) => {
  return items.map((item, index) => (
    <li className="p-2" key={index}>
      {item}
    </li>
  ));
};
export default ProductDetails;
