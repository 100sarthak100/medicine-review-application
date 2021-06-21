import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, listAllProducts } from "../action/productActions";
const ListProductForAdmin = ({ history }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (user === null || user.result.isAdmin === false) {
      history.push("/");
    }
    dispatch(listAllProducts());
  }, [dispatch, successDelete, user]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete user?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <h1>All Products</h1>

      <section className="container m-3 p-2">
        <div
          className="row"
          style={{
            marginLeft: "13%",
          }}
        >
          <div className="col">
            <Link to="/createProduct" className="btn btn-primary m-2 p-2">
              Create A product
            </Link>
          </div>
        </div>
        <article className="row">
          <div className="col">
            <table
              className="table"
              style={{
                marginLeft: "15%",
              }}
            >
              <thead>
                <tr className="table-success">
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Company Name</th>
                  <th colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div class="spinner-border spinner spinner-border text-warning spinner-border-lg"></div>
                ) : (
                  <>
                    {products.map((p, i) => (
                      <tr className="table-light">
                        <td>{p.productName}</td>
                        <td>
                          {"\u20B9"}
                          {p.price}
                        </td>
                        <td>{p.category}</td>
                        <td>{p.companyName}</td>
                        <td>
                          <button
                            onClick={() => deleteHandler(p._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <Link
                            to={`/admin/edit/${p._id}`}
                            className="btn btn-dark"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </>
  );
};

export default ListProductForAdmin;
