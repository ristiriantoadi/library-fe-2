import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import peopleImage from "assets/images/people-image.jpg";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { useState } from "react";
import BasicTabs from "./BasicTabs";

function InfoModal(props) {
  InfoModal.propTypes = {
    open: PropTypes.bool.isRequired, // Example: boolean prop
    setOpen: PropTypes.func.isRequired, // Example: function prop
  };
  const [value, setValue] = useState(0);

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
          width: "70%",
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
            Info Anggota
          </MDTypography>
        </MDBox>
        <Grid mx={2} container spacing={2}>
          <Grid item xs={12} md={4}>
            <MDBox mb={3}>
              <MDTypography variant="body2" fontWeight="bold">
                Nama
              </MDTypography>
              <MDTypography variant="body2">Ristirianto Adi</MDTypography>
            </MDBox>
            <MDBox mb={3}>
              <MDTypography variant="body2" fontWeight="bold">
                Tanggal Lahir
              </MDTypography>
              <MDTypography variant="body2">20 Februari 1998</MDTypography>
            </MDBox>
            <MDBox>
              <MDTypography variant="body2" fontWeight="bold">
                Email
              </MDTypography>
              <MDTypography variant="body2">ristiriantoadi@gmail.com</MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MDBox mb={3}>
              <MDTypography variant="body2" fontWeight="bold">
                ID Member
              </MDTypography>
              <MDTypography variant="body2">001</MDTypography>
            </MDBox>
            <MDBox mb={3}>
              <MDTypography variant="body2" fontWeight="bold">
                Jenis Kelamin
              </MDTypography>
              <MDTypography variant="body2">Laki-laki</MDTypography>
            </MDBox>
            <MDBox>
              <MDTypography variant="body2" fontWeight="bold">
                Nomor Telepon
              </MDTypography>
              <MDTypography variant="body2">08193311321</MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} pb={2}>
            <img src={peopleImage} height={"241px"}></img>
          </Grid>
        </Grid>
        <BasicTabs></BasicTabs>
      </MDBox>
    </Modal>
  );
}

export default InfoModal;
