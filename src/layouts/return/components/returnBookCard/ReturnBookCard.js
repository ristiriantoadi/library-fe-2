import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import style from "./style.module.css";

function ReturnBookCard(props) {
  ReturnBookCard.propTypes = {
    book: PropTypes.object,
  };
  return (
    <Card style={{ marginBottom: "20px", padding: "10px 5px" }}>
      <Grid container spacing={1}>
        <Grid xs={10} item p={1} mx={1} spacing={3} container>
          <Grid item xs={6}>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Judul
              </MDTypography>
              <MDTypography variant="body2">{props.book.title}</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Penulis
              </MDTypography>
              {props.book.author.split(",").map((author, index) => {
                return (
                  <MDTypography key={index} variant="body2">
                    {author}
                  </MDTypography>
                );
              })}
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
              <MDTypography variant="body2" mb={1} fontWeight="bold">
                Kondisi Buku
              </MDTypography>
              <FormControl fullWidth>
                <InputLabel>Kondisi</InputLabel>
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
              <MDTypography variant="body2">{props.book.isbn}</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Penerbit
              </MDTypography>
              <MDTypography variant="body2">{props.book.publisher}</MDTypography>
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
        <Grid className={style.checkBoxGrid} item>
          <input
            style={{ minWidth: "30px", minHeight: "30px" }}
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
