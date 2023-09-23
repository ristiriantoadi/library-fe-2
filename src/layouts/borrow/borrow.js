import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Loader from "components/Util/Loader/loader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addDate } from "util/util";
import { privateAxios } from "UtilRequests/util-axios";
import BookCard from "./components/bookCard";

function Borrow() {
  const [member, setMember] = useState();
  const [members, setMembers] = useState([]);
  const [name, setName] = useState();
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [bookTitle, setBookTitle] = useState();
  const MAX_BORROW = 3;
  const BORROW_DURATION = 3;
  const [loading, setLoading] = useState(false);
  const [loadingFetchBooks, setLoadingFetchBooks] = useState(false);
  const [remainingSlot, setRemainingSlot] = useState(MAX_BORROW);
  // const [countBorrows, setCountBorrows] = useState(0e);

  useEffect(() => {
    privateAxios
      .get("/admin/member")
      .then((response) => {
        setMembers(response.data.content);
      })
      .catch((error) => {});
  }, []);

  const fetchUnborrowedBooks = (member) => {
    setLoadingFetchBooks(true);
    const requestBooks = privateAxios.get("/admin/book/unborrowed/" + member["_id"]);
    const requestCountBorrows = privateAxios.get("admin/borrowing/total_count", {
      params: { memberId: member["_id"], status: "Sedang Dipinjam" },
    });
    Promise.all([requestBooks, requestCountBorrows])
      .then((responses) => {
        const responseBooks = responses[0];
        const responseCountBorrows = responses[1];

        setAllBooks(responseBooks.data);

        let countBorrows = responseCountBorrows.data.count;
        setRemainingSlot(MAX_BORROW - countBorrows);

        // Handle the responses here
      })
      .catch((error) => {});
    setLoadingFetchBooks(false);
  };

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
      fetchUnborrowedBooks(member);
    }
  };

  const addBook = () => {
    let booksCopy = [...books];
    let allBooksCopy = [...allBooks];
    let found = false;
    allBooks.forEach((b, index) => {
      if (`${b.title} (${b.isbn})` === bookTitle) {
        booksCopy.push(b);
        setBooks(booksCopy);

        allBooksCopy.splice(index, 1);
        setAllBooks(allBooksCopy);

        found = true;
        return;
      }
    });
    if (!found)
      toast.error("Buku tidak ditemukan", {
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
      setRemainingSlot((remainingSlot) => remainingSlot - 1);
    }
    setBookTitle("");
  };

  const deleteBook = (book) => {
    let booksCopy = [...books];
    let allBooksCopy = [...allBooks];

    const index = booksCopy.indexOf(book);
    if (index == -1) return;
    allBooksCopy.push(booksCopy[index]);
    booksCopy.splice(index, 1);

    setBooks(booksCopy);
    setAllBooks(allBooksCopy);
    setRemainingSlot((remainingSlot) => remainingSlot + 1);
  };

  const resetInput = () => {
    setMember(undefined);
    setBooks([]);
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberId = member["_id"];
    const bookIds = books.map((b) => {
      return b["_id"];
    });

    setLoading(true);
    privateAxios
      .post("/admin/borrowing/" + memberId, bookIds)
      .then((response) => {
        toast.success("Berhasil menambahkan data peminjaman", {
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
        resetInput();
      })
      .catch((error) => {
        setLoading(false);
        return;
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
                      onClick={findMember}
                      style={{ marginLeft: "5px" }}
                      color="info"
                    >
                      {loadingFetchBooks == true ? <Loader /> : "Cari Anggota"}
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
                    <input
                      list="books"
                      placeholder="Judul"
                      style={{ width: "300px", height: "40px", paddingLeft: "5px" }}
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                    ></input>
                    <datalist id="books">
                      {allBooks.map((book, index) => {
                        return <option key={index} value={`${book.title} (${book.isbn})`} />;
                      })}
                    </datalist>
                    <MDButton
                      disabled={
                        books.length == MAX_BORROW || bookTitle == undefined || bookTitle == ""
                      }
                      onClick={addBook}
                      style={{ marginLeft: "5px" }}
                      color="info"
                    >
                      Tambah
                    </MDButton>
                    <MDTypography style={{ marginLeft: "5px" }} variant="button">
                      {`(Sisa ${remainingSlot})`}
                    </MDTypography>
                  </div>
                </MDBox>
              )}
              {member && (
                <MDBox>
                  {books.map((b, index) => {
                    return <BookCard key={index} deleteBook={deleteBook} book={b}></BookCard>;
                  })}
                </MDBox>
              )}
              {member && books.length > 0 && (
                <Grid mb={1} container spacing={3}>
                  <Grid item xs={6}>
                    <MDBox>
                      <MDTypography variant="body2" fontWeight="bold">
                        Durasi Peminjaman
                      </MDTypography>
                      <MDTypography variant="body2">{BORROW_DURATION} hari</MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox>
                      <MDTypography variant="body2" fontWeight="bold">
                        Jadwal Pengembalian
                      </MDTypography>
                      <MDTypography variant="body2">
                        {addDate(new Date(), BORROW_DURATION).toDateString()}
                      </MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
              )}
              {member && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <MDButton type="submit" disabled={books.length == 0} color="info">
                    {loading === true ? <Loader></Loader> : "Submit"}
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
