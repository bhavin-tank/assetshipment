import {LOGIN_USER, LOGOUT_USER} from "../types";

export const login = (payload) => {
    return dispatch => dispatch({type: LOGIN_USER, payload});
}

export const logout = () => {
    return dispatch => dispatch({type: LOGOUT_USER});
}