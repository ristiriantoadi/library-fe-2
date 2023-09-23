import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import style from "./style.module.css";

function BookCard() {
  return (
    <Card style={{ marginBottom: "20px" }}>
      <Grid container p={2} mx={3}>
        <Grid item xs={12} md={6}>
          <MDBox mb={1}>
            <MDTypography variant="body2" fontWeight="bold">
              Judul
            </MDTypography>
            <MDTypography variant="body2">Dilarang Mencintai Bunga-bunga</MDTypography>
          </MDBox>
          <MDBox>
            <MDTypography variant="body2" fontWeight="bold">
              Penulis
            </MDTypography>
            <MDTypography variant="body2">Kuntowijoyo</MDTypography>
            <MDTypography variant="body2">Danarto</MDTypography>
            <MDTypography variant="body2">Seno Gumira</MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <MDBox mb={1}>
            <MDTypography variant="body2" fontWeight="bold">
              ISBN
            </MDTypography>
            <MDTypography variant="body2">1011221123</MDTypography>
          </MDBox>
          <MDBox>
            <MDTypography variant="body2" fontWeight="bold">
              Penerbit
            </MDTypography>
            <MDTypography variant="body2">Sinar Harapan</MDTypography>
          </MDBox>
        </Grid>
        <Grid
          style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
          item
          xs={12}
          md={2}
        >
          <DeleteIcon
            className={style.delete}
            style={{ width: "40px", height: "40px" }}
          ></DeleteIcon>
        </Grid>
      </Grid>
    </Card>
  );
}

export default BookCard;
