import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import style from "./style.module.css";

function BookCard(props) {
  BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    deleteBook: PropTypes.func.isRequired,
  };
  return (
    <Card style={{ marginBottom: "20px" }}>
      <Grid container p={1} mx={1}>
        <Grid
          item
          xs={12}
          style={{ marginRight: "30px", display: "flex", justifyContent: "center" }}
          md={2}
        >
          <img height={150} src={props.book.cover}></img>
        </Grid>
        <Grid item xs={12} md={4}>
          <MDBox mb={1}>
            <MDTypography variant="body2" fontWeight="bold">
              Judul
            </MDTypography>
            <MDTypography variant="body2">{props.book.title}</MDTypography>
          </MDBox>
          <MDBox>
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
        </Grid>
        <Grid item xs={12} md={4}>
          <MDBox mb={1}>
            <MDTypography variant="body2" fontWeight="bold">
              ISBN
            </MDTypography>
            <MDTypography variant="body2">{props.book.isbn}</MDTypography>
          </MDBox>
          <MDBox>
            <MDTypography variant="body2" fontWeight="bold">
              Penerbit
            </MDTypography>
            <MDTypography variant="body2">{props.book.publisher}</MDTypography>
          </MDBox>
        </Grid>
        <Grid
          style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
          item
          xs={12}
          md={1}
        >
          <DeleteIcon
            onClick={(e) => props.deleteBook(props.book)}
            className={style.delete}
            style={{ width: "40px", height: "40px" }}
          ></DeleteIcon>
        </Grid>
      </Grid>
    </Card>
  );
}

export default BookCard;
