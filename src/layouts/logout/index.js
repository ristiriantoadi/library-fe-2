import { Navigate } from "react-router-dom";
import { logout } from "UtilRequests/admin-account";

function Logout() {
  logout();
  return <Navigate to="/login" />;
}

export default Logout;
