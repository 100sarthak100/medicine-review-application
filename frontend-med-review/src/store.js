import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
  productCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import { reviewReducer } from "./reducers/reviewReducers";
import authReducer from "./reducers/authReducers";
import { userListReducer, userDeleteReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  review: reviewReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
