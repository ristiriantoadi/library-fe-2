import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { styled } from "@mui/material/styles";
import peopleImage from "assets/images/people-image.jpg";
import { useEffect, useState } from "react";

function AddMemberModal(props) {
  const [profileImage, setProfileImage] = useState(undefined);
  const [preview, setPreview] = useState(peopleImage);

  AddMemberModal.propTypes = {
    open: PropTypes.bool.isRequired, // Example: boolean prop
    setOpen: PropTypes.func.isRequired, // Example: function prop
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

  const onSelectFile = (e) => {
    console.log("files", e.target.files);
    setProfileImage(e.target.files[0]);
  };

  useEffect(() => {
    if (!profileImage) {
      setPreview(peopleImage);
      return;
    }

    const objectUrl = URL.createObjectURL(profileImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [profileImage]);

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <MDBox
        bgColor="white"
        // py={3
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
            Tambah Anggota
          </MDTypography>
        </MDBox>
        <MDBox mx={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                <MDTypography mb={1} variant="body2" fontWeight="bold">
                  Nama
                </MDTypography>
                <MDInput type="text" required fullWidth />
              </MDBox>
              <MDBox mb={3}>
                <MDTypography mb={1} variant="body2" fontWeight="bold">
                  ID Anggota
                </MDTypography>
                <MDInput type="text" required fullWidth />
              </MDBox>
              <MDBox mb={3}>
                <MDTypography mb={1} variant="body2" fontWeight="bold">
                  Tanggal Lahir
                </MDTypography>
                <MDInput type="date" required fullWidth />
              </MDBox>
              <MDBox mb={3}>
                <MDTypography mb={1} variant="body2" fontWeight="bold">
                  Jenis Kelamin
                </MDTypography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select style={{ height: "44px" }} label="gender">
                    <MenuItem value="MAN">Laki-laki</MenuItem>
                    <MenuItem value="WOMAN">Perempuan</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography mb={1} variant="body2" fontWeight="bold">
                  Email
                </MDTypography>
                <MDInput type="email" required fullWidth />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container flexDirection="column" alignItems="center">
                <Grid item style={{ flex: "1" }}>
                  <img src={preview} style={{ margin: "auto" }} height="333px" width="250px"></img>
                </Grid>
                <Grid item>
                  <MDBox mb={3}>
                    <MDButton component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                      Upload Foto Profil
                      <VisuallyHiddenInput type="file" onChange={onSelectFile} />
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
              <Grid item>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Nomor Telepon
                  </MDTypography>
                  <MDInput type="tel" required fullWidth />
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox style={{ display: "flex", justifyContent: "flex-end" }} mx={5} mb={3}>
          <MDButton color="info">Submit</MDButton>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

export default AddMemberModal;
