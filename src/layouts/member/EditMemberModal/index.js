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
import peopleImage from "assets/images/people-image.webp";
import Loader from "components/Util/Loader/loader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { privateAxios } from "UtilRequests/util-axios";

function EditMemberModal(props) {
  const [profilePicture, setProfilePicture] = useState();
  const [preview, setPreview] = useState(peopleImage);
  const [name, setName] = useState();
  const [noId, setNoId] = useState();
  const [date, setDate] = useState();
  const [gender, setGender] = useState("MALE");
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [loading, setLoading] = useState(false);

  EditMemberModal.propTypes = {
    open: PropTypes.bool.isRequired, // Example: boolean prop
    setOpen: PropTypes.func.isRequired, // Example: function prop
    member: PropTypes.object,
    editSuccess: PropTypes.func.isRequired,
  };

  useEffect(() => {
    setName(props.member.name);
    setPreview(props.member.profilePicture);
    setNoId(props.member.noId);
    setDate(props.member.date);
    setGender(props.member.gender);
    setEmail(props.member.email);
    setPhoneNumber(props.member.phoneNumber);
  }, [props.member]);

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
    setProfilePicture(e.target.files[0]);
  };

  useEffect(() => {
    if (!profilePicture) {
      return;
    }
    const objectUrl = URL.createObjectURL(profilePicture);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePicture]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("noId", noId);
    formData.append("date", date);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    if (profilePicture !== undefined) formData.append("profilePicture", profilePicture);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await privateAxios.put("/admin/member/" + props.member["_id"], formData, config);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      return;
    }
    setLoading(false);
    toast.success("Berhasil Mengubah Data Anggota", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    props.setOpen(false);
    props.editSuccess();
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
              Edit Anggota
            </MDTypography>
          </MDBox>
          <MDBox mx={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Nama
                  </MDTypography>
                  <MDInput
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    required
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    ID Anggota
                  </MDTypography>
                  <MDInput
                    type="text"
                    required
                    fullWidth
                    onChange={(e) => {
                      setNoId(e.target.value);
                    }}
                    value={noId}
                  />
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Tanggal Lahir
                  </MDTypography>
                  <MDInput
                    type="date"
                    required
                    fullWidth
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    value={date}
                  />
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Jenis Kelamin
                  </MDTypography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      style={{ height: "44px" }}
                      label="gender"
                    >
                      <MenuItem value="MALE">Laki-laki</MenuItem>
                      <MenuItem value="FEMALE">Perempuan</MenuItem>
                    </Select>
                  </FormControl>
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography mb={1} variant="body2" fontWeight="bold">
                    Email
                  </MDTypography>
                  <MDInput
                    type="email"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container flexDirection="column" alignItems="center">
                  <Grid item style={{ flex: "1" }}>
                    <img
                      src={preview}
                      style={{ margin: "auto" }}
                      height="333px"
                      // width="250px"
                    ></img>
                  </Grid>
                  <Grid item>
                    <MDBox mb={3}>
                      <MDButton
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
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
                    <MDInput
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="tel"
                      required
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox style={{ display: "flex", justifyContent: "flex-end" }} mx={5} mb={3}>
            <MDButton type="submit" color="info">
              {loading === true ? <Loader></Loader> : "Submit"}
            </MDButton>
          </MDBox>
        </MDBox>
      </form>
    </Modal>
  );
}

export default EditMemberModal;
