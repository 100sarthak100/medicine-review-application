import {
  REVIEW_REQUEST,
  REVIEW_SUCCESS,
  REVIEW_FAIL,
} from "../constants/reviewConstants";

import axios from "axios";

export const submitReview = (review, productId) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_REQUEST,
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
      ` http://localhost:5000/products/createReview/${productId}`,
      review,
      config
    );

    console.log(`Actions: Data - ${data}`);

    dispatch({
      type: REVIEW_SUCCESS,
    });
  } catch (error) {
    console.log(`Error from Redux: ${error}`);
    dispatch({
      type: REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
