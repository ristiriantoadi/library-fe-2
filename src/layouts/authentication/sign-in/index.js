/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { useNavigate } from "react-router-dom";

import { login } from "UtilRequests/admin-account";

import Loader from "components/util/loader/loader";

function Basic() {
  const [noId, setNoId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(noId, password);
    } catch (error) {
      setLoading(false);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sistem Manajemen Perpustakaan
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" onSubmit={handleSubmit} role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                required
                value={noId}
                onChange={(e) => setNoId(e.target.value)}
                label="No ID"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                {loading === true ? <Loader></Loader> : "Login"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
