import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

function NoAuthRoute() {
    const {isSignedIn} = useSelector((store) => store.auth);
    return !isSignedIn ? <Outlet/> : <Navigate to="/asset-received" replace={true}/>;
}

export default NoAuthRoute;