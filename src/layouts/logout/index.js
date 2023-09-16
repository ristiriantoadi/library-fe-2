import { Navigate } from "react-router-dom";

function logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

export default logout;
