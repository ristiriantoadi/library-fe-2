import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ReturnBookCard() {
  return (
    <Card style={{ marginBottom: "20px" }}>
      <Grid container spacing={1}>
        <Grid xs={10} item p={1} mx={1} spacing={2} container>
          <Grid item xs={6}>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Judul
              </MDTypography>
              <MDTypography variant="body2">Dilarang Mencintai Bunga-bunga</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Pengarang
              </MDTypography>
              <MDTypography variant="body2">Kuntowijoyo</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Durasi Peminjaman
              </MDTypography>
              <MDTypography variant="body2">3 hari</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Keterlambatan
              </MDTypography>
              <MDTypography variant="body2">3 hari</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Kondisi Buku
              </MDTypography>
              <FormControl fullWidth>
                <InputLabel>Kondisi Buku</InputLabel>
                <Select value="Baik" style={{ height: "44px" }} label="category">
                  <MenuItem value="Baik">Baik</MenuItem>
                  <MenuItem value="Rusak">Rusak</MenuItem>
                  <MenuItem value="Hilang">Hilang</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
          </Grid>
          <Grid item xs={6}>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                ISBN
              </MDTypography>
              <MDTypography variant="body2">1221122</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Penerbit
              </MDTypography>
              <MDTypography variant="body2">Sinar Harapan</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Jadwal Pengembalian
              </MDTypography>
              <MDTypography variant="body2">21 Oktober 2023</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Denda
              </MDTypography>
              <MDTypography variant="body2">Rp. 2.000</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Denda Kerusakan/Kehilangan Buku
              </MDTypography>
              <MDTypography variant="body2">Rp. 2.000</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Total Denda
              </MDTypography>
              <MDTypography variant="body2">Rp. 4.000</MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        <Grid style={{ display: "flex", alignItems: "center" }} xs={1} item>
          <input
            style={{ width: "30px", height: "30px" }}
            type="checkbox"
            label="Text"
            value="John Smith"
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default ReturnBookCard;
