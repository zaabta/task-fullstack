import { useEffect} from "react";
import { useLocation , Navigate, Outlet } from "react-router-dom";

const RequiredAuth = () => {
    const location =  useLocation();
    useEffect(() => {
       token = localStorage.getItem("token") || null;
      }, [location.pathname]);

    return token ? (<Outlet/>) : <Navigate to={"/signin"} replace />
}

export default RequiredAuth;