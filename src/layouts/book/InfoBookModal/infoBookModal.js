import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import BasicTabs from "./BasicTabs";

function InfoBookModal(props) {
  InfoBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    book: PropTypes.object,
  };

  const displayAuthors = () => {
    if (props.book.author === undefined) return;
    return props.book.author.split(",").map((author, index) => (
      <MDTypography key={index} variant="body2">
        {author}
      </MDTypography>
    ));
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <MDBox
        bgColor="white"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          p: 4,
        }}
      >
        <MDBox
          mx={2}
          py={3}
          px={2}
          mt={-3}
          mb={3}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography id="modal-modal-title" variant="h6" color="white">
            Info Buku
          </MDTypography>
        </MDBox>
        <Grid container>
          <Grid
            style={{ display: "flex", justifyContent: "space-between" }}
            item
            xs={12}
            mx={3}
            lg={5}
          >
            <div>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  Judul
                </MDTypography>
                <MDTypography variant="body2">{props.book.title}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  Penulis
                </MDTypography>
                {displayAuthors()}
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  Penerbit
                </MDTypography>
                <MDTypography variant="body2">{props.book.publisher}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  Stok
                </MDTypography>
                <MDTypography variant="body2">{props.book.stock}</MDTypography>
              </MDBox>
            </div>
            <div>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  ISBN
                </MDTypography>
                <MDTypography variant="body2">{props.book.isbn}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  Tahun Terbit
                </MDTypography>
                <MDTypography variant="body2">{props.book.publicationYear}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  Kategori
                </MDTypography>
                <MDTypography variant="body2">{props.book.category}</MDTypography>
              </MDBox>
            </div>
          </Grid>
          <Grid
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            item
            xs={12}
            lg={5}
            mb={2}
          >
            <MDTypography variant="body2" fontWeight="bold">
              Cover
            </MDTypography>
            <img src={props.book.cover} style={{ width: "300px" }} />
          </Grid>
        </Grid>
        <BasicTabs></BasicTabs>
      </MDBox>
    </Modal>
  );
}

export default InfoBookModal;
