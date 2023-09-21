// Material Dashboard 2 React components

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
// Material Dashboard 2 React example components
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import { privateAxios } from "UtilRequests/util-axios";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";
import InfoModal from "./InfoModal";
import style from "./style.module.css";
// Data

// Data

// Dashboard components

function member() {
  const [openAddMember, setOpenAddMember] = useState(false);
  const [rows, setRows] = useState([]);
  const [openInfoMember, setOpenInfoMember] = useState(false);
  const [openEditMember, setOpenEditMember] = useState(false);
  const [members, setMembers] = useState([{}]);
  const [index, setIndex] = useState(0);

  const columns = [
    { Header: "Nama", accessor: "name", align: "left" },
    { Header: "ID Anggota", accessor: "memberId", align: "left" },
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "Nomor Telepon", accessor: "phoneNumber", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Aksi", accessor: "action", align: "center" },
  ];

  const fetchData = () => {
    privateAxios
      .get("/admin/member")
      .then((response) => {
        setMembers(response.data.content);
        let data = [];
        response.data.content.forEach((element, index) => {
          data.push({
            name: element.name,
            memberId: element.noId,
            email: element.email,
            phoneNumber: element.phoneNumber,
            status: element.status,
            action: (
              <div style={{ display: "flex", justifyContent: "space-evenly", width: "120px" }}>
                <MDTypography
                  className={style.link}
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                  onClick={() => {
                    setOpenInfoMember(true);
                    setIndex(index);
                  }}
                >
                  <InfoIcon fontSize="inherit"></InfoIcon> Info
                </MDTypography>
                <MDTypography
                  className={style.link}
                  verticalAlign="center"
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                  onClick={() => {
                    setOpenEditMember(true);
                    setIndex(index);
                  }}
                >
                  <EditIcon></EditIcon>
                  Edit
                </MDTypography>
              </div>
            ),
          });
        });
        setRows(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postSuccess = () => {
    fetchData();
  };

  return (
    <MDBox pt={6} pb={3}>
      <AddMemberModal
        open={openAddMember}
        setOpen={setOpenAddMember}
        postSuccess={postSuccess}
      ></AddMemberModal>
      <InfoModal
        open={openInfoMember}
        member={members[index]}
        setOpen={setOpenInfoMember}
      ></InfoModal>
      <EditMemberModal
        member={members[index]}
        open={openEditMember}
        setOpen={setOpenEditMember}
        editSuccess={fetchData}
      ></EditMemberModal>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Anggota
              </MDTypography>
            </MDBox>
            <MDBox mx={2} mt={3}>
              <MDButton onClick={() => setOpenAddMember(true)} color="info">
                <AddIcon />
                Tambah Anggota
              </MDButton>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={true}
                showTotalEntries={true}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default member;
