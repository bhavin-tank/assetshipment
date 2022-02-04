import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import {login, logout} from "./redux/actions/auth";
import Header from "./layouts/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Login from "./Page/Login";
import NoAuthRoute from "./components/NoAuthRoute";
import AssetReceived from "./Page/AssetReceived";
import Home from "./Page/Home";
// import Barcode from "./Page/Barcode";

function App() {
    const {firebase} = useSelector((store) => store.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            if (user) dispatch(login(user));
            if (!user) dispatch(logout());
        });
        return () => unregisterAuthObserver();
    }, [firebase, dispatch]);

    return <Fragment>
        <Header/>
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace={true}/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/" element={<AuthRoute/>}>
                <Route path="/asset-received" element={<AssetReceived/>}/>
                {/* <Route path="/barcode" element={<Barcode/>}/> */}
            </Route>
            <Route path="/" element={<NoAuthRoute/>}>
                <Route path="/login" element={<Login/>}/>
            </Route>
        </Routes>
    </Fragment>;
}

export default App;
