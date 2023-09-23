import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import BookCard from "./components/bookCard";

function Borrow() {
  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card style={{ paddingLeft: "20px", paddingBottom: "30px" }}>
            <MDBox
              mt={-3}
              py={3}
              px={2}
              mb={3}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Peminjaman
              </MDTypography>
            </MDBox>
            <form style={{ width: "70%", minWidth: "300px" }}>
              <MDBox mb={3} px={1}>
                <MDBox mb={3}>
                  <MDTypography variant="h5" mb={1}>
                    Anggota
                  </MDTypography>
                  <MDInput type="text" label="Nama" style={{ width: "300px" }} />
                </MDBox>
                <MDBox>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <MDBox mb={1}>
                        <MDTypography variant="body2" fontWeight="bold">
                          Nama
                        </MDTypography>
                        <MDTypography variant="body2">Ristirianto Adi</MDTypography>
                      </MDBox>
                      <MDBox>
                        <MDTypography variant="body2" fontWeight="bold">
                          Email
                        </MDTypography>
                        <MDTypography variant="body2">ristiriantoadi@gmail.com</MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={6}>
                      <MDBox mb={1}>
                        <MDTypography variant="body2" fontWeight="bold">
                          ID Anggota
                        </MDTypography>
                        <MDTypography variant="body2">001</MDTypography>
                      </MDBox>
                      <MDBox>
                        <MDTypography variant="body2" fontWeight="bold">
                          Nomor Telepon
                        </MDTypography>
                        <MDTypography variant="body2">081941123221</MDTypography>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="h5" mb={1}>
                  Buku
                </MDTypography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MDInput type="text" label="Judul" />
                  <MDButton style={{ marginLeft: "5px" }} color="info">
                    Tambah
                  </MDButton>
                  <MDTypography style={{ marginLeft: "5px" }} variant="button">
                    (Maks 3)
                  </MDTypography>
                </div>
              </MDBox>
              <MDBox>
                <BookCard></BookCard>
                <BookCard></BookCard>
              </MDBox>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <MDButton color="info">Submit</MDButton>
              </div>
            </form>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Borrow;
