import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoutes = ({ }) => {
  return <Outlet/>;
}

PublicRoutes.prototype = {
  redirectTo: PropTypes?.string,
};

export default PublicRoutes;
