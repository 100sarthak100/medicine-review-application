import axios from "axios";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from "../constants/userConstants";

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`,
      },
    };

    const { data } = await axios.get(`http://localhost:5000/users`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`,
      },
    };

    await axios.delete(`http://localhost:5000/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
