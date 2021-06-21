import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <>
      <div
        className="card mb-3 p-3 my-3"
        style={{
          minHeight: "25rem",
          backgroundColor: "white"
        }}
      >
        <div className="card-header" style={{
          backgroundColor: "white"
        }}>
          <img src={product.productImage} alt="" height="100" width="100" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
        </div>
        <div>
          <span class="badge badge-primary p-1 m-1">
            {"\u20B9 "}
            {product.price}
          </span>
          <span class="badge badge-info  p-1 m-1">{product.category}</span>

          <span class="badge badge-warning  p-1 m-1">
            {product.overallRating} ★
        </span>
        </div>
        <div>
          <div className="m-1">
            <Link className="btn btn-success" to={`/products/${product._id}`}>
              View More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
