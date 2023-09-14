// Material Dashboard 2 React components

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
// Material Dashboard 2 React example components
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import style from "./style.module.css";
// Data

// Data

// Dashboard components

function member() {
  const columns = [
    { Header: "Nama", accessor: "name", align: "left" },
    { Header: "ID Anggota", accessor: "memberId", align: "left" },
    { Header: "Informasi Kontak", accessor: "contact", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Aksi", accessor: "action", align: "center" },
  ];

  const rows = [
    {
      name: "Ristirianto Adi",
      memberId: "1221322",
      contact: "ristiriantoadi@gmail.com",
      status: "Aktif",
      action: (
        <div style={{ display: "flex", justifyContent: "space-evenly", width: "120px" }}>
          <MDTypography
            className={style.link}
            verticalAlign="center"
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            <InfoIcon fontSize="inherit"></InfoIcon> Info
          </MDTypography>
          <MDTypography
            className={style.link}
            verticalAlign="center"
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            sx={{ "&:hover": { color: "white" } }}
          >
            <EditIcon></EditIcon>
            Edit
          </MDTypography>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Anggota
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default member;
