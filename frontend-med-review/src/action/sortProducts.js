import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL
} from "../constants/productConstants";

import * as api from '../api';

export const sortByRating = () => async (dispatch) => {
    try {
        // sort by rating
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await api.sortByRating();
        const action = {
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        }
        console.log("dispatching");

        dispatch(action);
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const sortByCategory = (category) => async (dispatch) => {
    try {
        // sort by category
        console.log(category);
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await api.sortByCategory(category);
        const action = {
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        }
        console.log("dispatching");

        dispatch(action);
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const sortByName = (productName) => async (dispatch) => {
    try {
        // sort by product name
        // console.log(productName);
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await api.sortByName(productName);
        const action = {
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        }
        console.log("dispatching");

        dispatch(action);
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};