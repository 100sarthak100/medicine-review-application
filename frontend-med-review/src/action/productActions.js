/**
 * Product Actions Created for redux operations on product.
 * @author Shivaprasad Bhat
 */
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from "../constants/productConstants";

import axios from "axios";

/**
 * Function that takes action of listing all products without authentication
 * Dispatches the product request, success and fail reducers
 */
export const listAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/products`);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * Function that takes action of listing a product's details without authentication
 * Dispatches the product request, success and fail reducers
 */
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/products/getProductById/${id}`
    );

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * Action to create a new product in the database.
 * Admin Only
 * Verifies the token from the signed in user to confirm the request is made by an admin
 * @param {*} product
 * @returns {state}
 */
export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/products/`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * Action function to delete a product by ID
 * Admin Only - Verifies the token from the signed in user to confirm the request is made by an admin
 * @param {*} id
 * @returns {state}
 */
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`,
      },
    };

    await axios.delete(`http://localhost:5000/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * Action function that dispatches the product update
 * Admin Only -Verifies the token from the signed in user to confirm the request is made by an admin
 * @param {*} product
 * @returns {state}
 */
export const updateProduct = (product) => async (dispatch) => {
  console.log(`Actions: productId : ${product._id}`);
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`,
      },
    };

    const { data } = await axios.patch(
      `http://localhost:5000/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
