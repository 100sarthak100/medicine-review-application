import { AUTH, LOGOUT } from '../constants/authConstants';

const authReducer = (state = { authData: null }, action) => { // state is posts and is empty array initially
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
}

export default authReducer;