import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
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
  const [publicationYear, setPublicationYear] = useState(2000);

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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Tahun Terbit
                  </MDTypography>
                  <MDInput
                    type="number"
                    min="1900"
                    max="2099"
                    value={publicationYear}
                    onChange={(e) => setPublicationYear(e.target.value)}
                    step="1"
                    required
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Stok
                  </MDTypography>
                  <MDInput type="number" min="0" step="1" required fullWidth />
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
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Kategori
                  </MDTypography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                    <Select style={{ height: "44px" }} label="category">
                      <MenuItem value="literature">Sastra</MenuItem>
                      <MenuItem value="science">Sains</MenuItem>
                      <MenuItem value="tech">Teknologi</MenuItem>
                      <MenuItem value="history">Sejarah</MenuItem>
                    </Select>
                  </FormControl>
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Cover
                  </MDTypography>
                  <MDButton component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload Cover
                    <VisuallyHiddenInput type="file" />
                  </MDButton>
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
