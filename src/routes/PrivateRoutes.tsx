import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoutes = ({ children, redirectTo, isAllowed }: any) => {
  if (!isAllowed) {    
    return <Navigate to={redirectTo} />
  }

  return children ? children : <Outlet />
}

export default PrivateRoutes;
