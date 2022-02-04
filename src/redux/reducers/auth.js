import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import {LOGIN_USER, LOGOUT_USER} from "../types";

const firebaseConfig = {
    apiKey: "AIzaSyAXWed7qk0DGRVzep6DLiDmAEXAps5DipE",
    authDomain: "reactjs-84d79.firebaseapp.com",
    projectId: "reactjs-84d79",
    storageBucket: "reactjs-84d79.appspot.com",
    messagingSenderId: "795557688625",
    appId: "1:795557688625:web:474243cfe38197ade62c10",
    measurementId: "G-CTKXRQV7DM"
};

const initialState = {
    firebase: firebase,
    firebaseApp: firebase.initializeApp(firebaseConfig),
    isSignedIn: false,
    user: null,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, isSignedIn: true, user: action.payload};
        case LOGOUT_USER:
            return {...state, isSignedIn: false, user: null};
        default:
            return state;
    }
};

export default auth;