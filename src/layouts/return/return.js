import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { privateAxios } from "UtilRequests/util-axios";
import ReturnBookCard from "./components/returnBookCard/ReturnBookCard";

function Return() {
  const [name, setName] = useState();
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const fetchBorrowedBooks = (member) => {
    privateAxios
      .get("/admin/borrowing", {
        params: { memberId: member["_id"], status: "Sedang Dipinjam" },
      })
      .then((response) => {
        const borrowedBooks = response.data.map((borrowing) => {
          borrowing["book"]["borrowTime"] = borrowing["createTime"];
          borrowing["book"]["borrowId"] = borrowing["_id"];
          borrowing["book"]["userId"] = borrowing["userId"];
          borrowing["book"]["bookId"] = borrowing["book"]["_id"];
          return borrowing["book"];
        });
        setBorrowedBooks(borrowedBooks);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    privateAxios
      .get("/admin/member")
      .then((response) => {
        setMembers(response.data.content);
      })
      .catch((error) => {});
  }, []);

  const findMember = () => {
    let found = false;
    let member;
    members.forEach((m) => {
      if (`${m.name} (${m.noId})` === name) {
        setMember(m);
        member = m;
        found = true;
        return;
      }
    });
    if (!found)
      toast.error("Anggota tidak ditemukan", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    else {
      fetchBorrowedBooks(member);
    }
  };

  const calculateTotalFee = (books) => {
    let totalFee = 0;
    books.forEach((book) => {
      if (book.checked === true) {
        totalFee += book.totalFee;
      }
    });
    setTotalFee(totalFee);
  };

  const bookUpdated = (book) => {
    let borrowedBooksCopy = [...borrowedBooks];
    setDisabled(true);
    borrowedBooksCopy = borrowedBooksCopy.map((bookCopy) => {
      if (bookCopy["borrowId"] === book["borrowId"]) {
        bookCopy = book;
      }
      if (bookCopy.checked == true) setDisabled(false);
      return bookCopy;
    });
    calculateTotalFee(borrowedBooksCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = [];
    borrowedBooks.forEach((book) => {
      if (book.checked === true) {
        let fees = [];
        if (book.lateFee > 0) {
          fees.push({ feeType: "Keterlambatan", amount: book.lateFee });
        }
        if (book.lostDamageFee > 0) {
          if (book.condition == "Hilang") {
            fees.push({ feeType: "Buku Hilang", amount: book.lostDamageFee });
          } else {
            fees.push({ feeType: "Buku Rusak", amount: book.lostDamageFee });
          }
        }
        data.push({
          borrowId: book["borrowId"],
          bookId: book["bookId"],
          fees: fees,
          status: book.condition == "Hilang" ? "Hilang" : "Telah Dikembalikan",
        });
      }
    });
    privateAxios
      .put(`/admin/borrowing/${member["_id"]}/return`, data)
      .then((response) => {
        toast.success("Berhasil mengembalikan buku", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setMember(undefined);
        setBorrowedBooks([]);
        setTotalFee(0);
      })
      .catch((error) => {});
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
                Pengembalian
              </MDTypography>
            </MDBox>
            <form onSubmit={handleSubmit} style={{ width: "70%", minWidth: "300px" }}>
              <MDBox mb={3}>
                <MDBox mb={3}>
                  <MDTypography variant="h5" mb={1}>
                    Anggota
                  </MDTypography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      required
                      list="members"
                      value={name}
                      placeholder="Nama Anggota"
                      style={{ width: "300px", height: "40px", paddingLeft: "5px" }}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                    <datalist id="members">
                      {members.map((m, index) => {
                        return <option key={index} value={`${m.name} (${m.noId})`} />;
                      })}
                    </datalist>
                    <MDButton
                      disabled={name === "" || name === undefined}
                      style={{ marginLeft: "5px" }}
                      color="info"
                      onClick={findMember}
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
                <MDBox>
                  <MDTypography variant="h5" mb={2}>
                    Buku
                  </MDTypography>
                  {borrowedBooks.map((book, index) => {
                    return (
                      <ReturnBookCard
                        bookUpdated={bookUpdated}
                        key={index}
                        book={book}
                      ></ReturnBookCard>
                    );
                  })}
                </MDBox>
              )}
              {member && (
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <MDBox>
                    <MDTypography variant="h4">Total Denda</MDTypography>
                    <MDTypography variant="body">Rp. {totalFee}</MDTypography>
                  </MDBox>
                  <MDButton
                    disabled={disabled}
                    style={{ height: "40px" }}
                    type="submit"
                    color="info"
                  >
                    Konfirmasi
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

export default Return;
