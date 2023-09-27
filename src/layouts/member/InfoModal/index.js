import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import BasicTabs from "./BasicTabs";

function InfoModal(props) {
  InfoModal.propTypes = {
    open: PropTypes.bool.isRequired, // Example: boolean prop
    setOpen: PropTypes.func.isRequired, // Example: function prop
    member: PropTypes.object,
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
          // overflow: "scroll",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          // maxHeight: "90vh",
          p: 4,
        }}
        // borderRadius="lg"
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
        <MDBox style={{ overflow: "scroll", maxHeight: "80vh" }}>
          <Grid mx={2} container spacing={2}>
            <Grid item xs={12} md={4}>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  Nama
                </MDTypography>
                <MDTypography variant="body2">{props.member.name}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  Tanggal Lahir
                </MDTypography>
                <MDTypography variant="body2">{props.member.date}</MDTypography>
              </MDBox>
              <MDBox>
                <MDTypography variant="body2" fontWeight="bold">
                  Email
                </MDTypography>
                <MDTypography variant="body2">{props.member.email}</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={3}>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  ID Member
                </MDTypography>
                <MDTypography variant="body2">{props.member.noId}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="body2" fontWeight="bold">
                  Jenis Kelamin
                </MDTypography>
                <MDTypography variant="body2">{props.member.gender}</MDTypography>
              </MDBox>
              <MDBox>
                <MDTypography variant="body2" fontWeight="bold">
                  Nomor Telepon
                </MDTypography>
                <MDTypography variant="body2">{props.member.phoneNumber}</MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={4} pb={2}>
              <img src={props.member.profilePicture} style={{ width: "300px" }}></img>
            </Grid>
          </Grid>
          <BasicTabs member={props.member}></BasicTabs>
        </MDBox>
      </MDBox>
    </Modal>
  );
}
export default InfoModal;
