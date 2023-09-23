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
import Loader from "components/Util/Loader/loader";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { privateAxios } from "UtilRequests/util-axios";

function AddBookModal(props) {
  AddBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
  };
  const [authors, setAuthors] = useState([""]);
  const [publicationYear, setPublicationYear] = useState(2000);
  const [title, setTitle] = useState();
  const [isbn, setIsbn] = useState();
  const [publisher, setPublisher] = useState();
  const [category, setCategory] = useState();
  const [cover, setCover] = useState();
  const [stock, setStock] = useState();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (!cover) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(cover);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [cover]);

  useEffect(() => {
    if (props.categories.length == 0) return;
    setCategory(props.categories[0]);
  }, [props.categories]);

  const resetInput = () => {
    setAuthors([""]);
    setPublicationYear();
    setTitle();
    setIsbn();
    setPublisher();
    setCategory();
    setCover();
    setStock();
    setPreview();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!cover) {
      toast.error("Harap mengunggah gambar cover", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("isbn", isbn);
    formData.append("author", authors.join(","));
    formData.append("publicationYear", publicationYear);
    formData.append("publisher", publisher);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("cover", cover);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await privateAxios.post("/admin/book/", formData, config);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      return;
    }
    setLoading(false);
    props.setOpen(false);
    toast.success("Berhasil Menambahkan Data Buku", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    resetInput();
    props.fetchData();
  };
  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
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
                  <MDInput
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                  />
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
                  <MDInput
                    type="number"
                    min="0"
                    step="1"
                    required
                    fullWidth
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    ISBN
                  </MDTypography>
                  <MDInput
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    required
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Penerbit
                  </MDTypography>
                  <MDInput
                    type="text"
                    required
                    fullWidth
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Kategori
                  </MDTypography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ height: "44px" }}
                      label="category"
                    >
                      {props.categories.map((category, index) => {
                        return (
                          <MenuItem key={index} value={category}>
                            {category}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Cover
                  </MDTypography>
                  <MDButton component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload Cover
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => setCover(e.target.files[0])}
                    />
                  </MDButton>
                </MDBox>
                <MDBox mb={3}>{preview && <img src={preview} style={{ width: "225px" }} />}</MDBox>
                <MDBox style={{ display: "flex", justifyContent: "flex-end" }} mb={3}>
                  <MDButton type="submit" color="info">
                    {loading == true ? <Loader /> : "Submit"}
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
