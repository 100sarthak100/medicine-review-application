import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./screens/Products";
import ProductDetails from "./screens/ProductDetails";
import CreateProduct from "./screens/CreateProduct";
import Auth from "./screens/Auth";
import Review from "./screens/Review";
import UserProfile from "./screens/UserProfile";
import ListProductForAdmin from "./screens/ListProductForAdmin";
import EditProductScreen from "./screens/EditProductScreen";
import UserManagement from "./screens/UserManagement";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Products} />
      {/* <Route exact path="/login" component={LoginScreen} /> */}
      <Route exact path="/auth" component={Auth} />
      {/* <Route exact path="/signup" component={SignupScreen} /> */}
      <Route exact path="/products/:id" component={ProductDetails} />
      <Route exact path="/user" component={UserProfile} />
      <Route exact path="/products/:id/review" component={Review} />
      <Route exact path="/createProduct" component={CreateProduct} />
      <Route exact path="/admin/listProducts" component={ListProductForAdmin} />
      <Route exact path="/admin/edit/:id" component={EditProductScreen} />
      <Route exact path="/admin/listUsers" component={UserManagement} />
    </Router>
  );
};

export default App;
