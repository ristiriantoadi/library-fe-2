import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import { privateAxios } from "UtilRequests/util-axios";
import BookCard from "./components/bookCard";

function Borrow() {
  const [member, setMember] = useState();
  const [listMembers, setListMembers] = useState([]);
  const [name, setName] = useState();
  const [books, setBooks] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    privateAxios
      .get("/admin/member")
      .then((response) => {
        setListMembers(response.data.content);
        console.log("list members", listMembers);
      })
      .catch((error) => {
        return;
      });
  }, []);

  const findMember = () => {
    listMembers.forEach((m) => {
      if (`${m.name} (${m.noId})` === name) {
        setMember(m);
      }
    });
  };

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card style={{ paddingLeft: "20px", paddingBottom: "30px" }}>
            <MDBox
              mt={-3}
              py={3}
              px={2}
              mb={3}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Peminjaman
              </MDTypography>
            </MDBox>
            <form style={{ width: "70%", minWidth: "300px" }}>
              <MDBox mb={3} px={1}>
                <MDBox mb={3}>
                  <MDTypography variant="h5" mb={1}>
                    Anggota
                  </MDTypography>
                  <div>
                    <input
                      list="members"
                      placeholder="Nama Anggota ..."
                      style={{ width: "300px", height: "40px", marginTop: "5px" }}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                    <datalist id="members">
                      {listMembers.map((m, index) => {
                        return <option key={index} value={`${m.name} (${m.noId})`} />;
                      })}
                    </datalist>
                    <MDButton
                      onClick={findMember}
                      style={{ marginLeft: "5px", marginTop: "5px" }}
                      color="info"
                    >
                      Cari Anggota
                    </MDButton>
                  </div>
                </MDBox>
                <MDBox>
                  {member && (
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <MDBox mb={1}>
                          <MDTypography variant="body2" fontWeight="bold">
                            Nama
                          </MDTypography>
                          <MDTypography variant="body2">{member.name}</MDTypography>
                        </MDBox>
                        <MDBox>
                          <MDTypography variant="body2" fontWeight="bold">
                            Email
                          </MDTypography>
                          <MDTypography variant="body2">{member.email}</MDTypography>
                        </MDBox>
                      </Grid>
                      <Grid item xs={6}>
                        <MDBox mb={1}>
                          <MDTypography variant="body2" fontWeight="bold">
                            ID Anggota
                          </MDTypography>
                          <MDTypography variant="body2">{member.noId}</MDTypography>
                        </MDBox>
                        <MDBox>
                          <MDTypography variant="body2" fontWeight="bold">
                            Nomor Telepon
                          </MDTypography>
                          <MDTypography variant="body2">{member.phoneNumber}</MDTypography>
                        </MDBox>
                      </Grid>
                    </Grid>
                  )}
                </MDBox>
              </MDBox>
              {member && (
                <MDBox mb={3}>
                  <MDTypography variant="h5" mb={1}>
                    Buku
                  </MDTypography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDInput type="text" label="Judul" />
                    <MDButton style={{ marginLeft: "5px" }} color="info">
                      Tambah
                    </MDButton>
                    <MDTypography style={{ marginLeft: "5px" }} variant="button">
                      (Maks 3)
                    </MDTypography>
                  </div>
                </MDBox>
              )}
              {member && (
                <MDBox>
                  {books.map((b, index) => {
                    return <BookCard key={index}></BookCard>;
                  })}
                </MDBox>
              )}
              {member && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <MDButton disabled={disabled} color="info">
                    Submit
                  </MDButton>
                </div>
              )}
            </form>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Borrow;
