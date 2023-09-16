import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const token = localStorage.getItem("token");
  // return <div>{token ? <Outlet /> : <Navigate to="/login" />}</div>;
  return (
    <DashboardLayout>
      <div style={{ flex: "1", padding: "20px" }}>
        <DashboardNavbar />
        {token ? <Outlet /> : <Navigate to="/login" />}
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default PrivateRoutes;
