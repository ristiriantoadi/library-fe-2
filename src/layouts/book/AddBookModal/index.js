import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { useState } from "react";

function AddBookModal(props) {
  AddBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
  };
  const [authors, setAuthors] = useState([""]);

  const addAuthor = () => {
    const authorsCopy = [...authors];
    authorsCopy.push("");
    setAuthors(authorsCopy);
  };

  const updateAuthor = (value, index) => {
    let authorsCopy = [...authors];
    authorsCopy[index] = value;
    setAuthors(authorsCopy);
  };

  const deleteAuthor = (indexDelete) => {
    let authorsCopy = [...authors];
    let authorsCopyTwo = [];
    authors.forEach((item, index) => {
      if (index !== indexDelete) {
        authorsCopyTwo.push(item);
      }
    });
    setAuthors(authorsCopyTwo);
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form>
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
              Tambah Buku
            </MDTypography>
          </MDBox>
          <MDBox mx={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Judul
                  </MDTypography>
                  <MDInput type="text" required fullWidth />
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Penulis
                  </MDTypography>
                  {authors.map((item, index) => (
                    <div style={{ display: "flex" }} key={index}>
                      <MDInput
                        value={item}
                        onChange={(e) => updateAuthor(e.target.value, index)}
                        style={{ marginBottom: "5px" }}
                        type="text"
                        required
                        fullWidth
                      />
                      {authors.length > 1 && (
                        <button
                          onClick={() => deleteAuthor(index)}
                          style={{
                            padding: "0px",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            background: "none",
                            border: "0px",
                            paddingLeft: "10px",
                          }}
                        >
                          <DeleteIcon style={{ width: "25px", height: "25px" }}></DeleteIcon>
                        </button>
                      )}
                    </div>
                  ))}
                  <MDButton onClick={addAuthor} style={{ marginTop: "5px", paddingLeft: "0px" }}>
                    Tambah Penulis
                  </MDButton>
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    ISBN
                  </MDTypography>
                  <MDInput type="text" required fullWidth />
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Penerbit
                  </MDTypography>
                  <MDInput type="text" required fullWidth />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </form>
    </Modal>
  );
}

export default AddBookModal;
