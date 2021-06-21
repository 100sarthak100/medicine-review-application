/**
 * Authentication Actions
 * Defines Login & Sign up
 */
import { AUTH } from "../constants/authConstants";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // login user
    console.log("makeing req");
    console.log(formData);
    const { data } = await api.signin(formData);
    const action = {
      type: AUTH,
      data,
    };
    console.log("dispatching");
    dispatch(action);

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user
    console.log(formData);
    const { data } = await api.signup(formData);
    const action = {
      type: AUTH,
      data,
    };
    dispatch(action);

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
