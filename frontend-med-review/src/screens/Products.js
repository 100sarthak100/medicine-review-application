import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from "../action/productActions";
import {
  sortByRating,
  sortByCategory,
  sortByName,
} from "../action/sortProducts";
import Product from "./Product";

const Products = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => {
    return state.productList;
  });

  const [productName, setproductName] = useState("null");
  const [category, setCategory] = useState("null");

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setproductName(e.target.value);
    setCategory(e.target.value);
  };

  const sortRating = () => {
    dispatch(sortByRating());
  };

  const sortCategory = (e) => {
    e.preventDefault();
    dispatch(sortByCategory(category));
  };

  const sortName = (e) => {
    e.preventDefault();
    dispatch(sortByName(productName));
  };

  return (
    <>
      <div className="navbar navbar-dark bg-primary">
        <ul className="nav justify-content-end" style={{ margin: "auto" }}>
          <li style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2 "
                type="productName"
                placeholder="Search By Name"
                onChange={handleChange}
              />
              <button className="btn btn-info my-2 my-sm-0" onClick={sortName}>
                Search By Name
              </button>
            </form>
          </li>
          <li style={{ paddingLeft: "0px", paddingRight: "30px" }}>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2 "
                type="category"
                placeholder="Search By Category"
                onChange={handleChange}
              />
              <button
                className="btn btn-info my-2 my-sm-0"
                onClick={sortCategory}
              >
                Search By Category
              </button>
            </form>
          </li>
          <li style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <button
              className="btn btn-warning my-2 my-sm-0"
              onClick={sortRating}
            >
              Sort By Rating
            </button>
          </li>
        </ul>
      </div>
      {loading ? (
        <>
          <div className="spinner-border spinner spinner-border text-warning spinner-border-lg"></div>
        </>
      ) : (
        <>
          <div className="text-center">
            <h1>Featured Products</h1>
          </div>

          <div className="container">
            <div className="row">
              {products.length === undefined ||
              products === "No matching products" ? (
                <div className="jumbotron m-5 p-4">
                  <h3>No products found</h3>
                </div>
              ) : (
                products.map((p) => (
                  <div
                    key={p._id}
                    className="col-sm-12 col-md-6 col-lg-5 col-xl-3"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <Product product={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
