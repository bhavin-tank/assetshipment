import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

function AuthRoute() {
    const {isSignedIn} = useSelector((store) => store.auth);
    return isSignedIn ? <Outlet/> : <Navigate to="/login" replace={true}/>;
}

export default AuthRoute;