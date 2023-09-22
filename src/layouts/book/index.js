import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { confirmPopUp } from "UtilComponents/UtilSweetAlert";
import { privateAxios } from "UtilRequests/util-axios";
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal/editBookModal";
import InfoBookModal from "./InfoBookModal/infoBookModal";
import style from "./style.module.css";

function Book() {
  const columns = [
    { Header: "Judul", accessor: "title", align: "left" },
    { Header: "ISBN", accessor: "isbn", align: "left" },
    { Header: "Penulis", accessor: "author", align: "left" },
    { Header: "Kategori", accessor: "category", align: "left" },
    { Header: "Stok", accessor: "stock", align: "left" },
    { Header: "Aksi", accessor: "action", align: "left" },
  ];
  const [rows, setRows] = useState([]);
  const [openAddBook, setOpenAddBook] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openEditBook, setOpenEditBook] = useState(false);
  const [index, setIndex] = useState(0);
  const [books, setBooks] = useState([{}]);

  const fetchData = async () => {
    privateAxios
      .get("/admin/book")
      .then((response) => {
        if (response.data.length == 0) {
          setBooks([{}]);
        } else {
          setBooks(response.data);
        }
        const dataRows = response.data.map((d, index) => {
          return {
            title: d.title,
            isbn: d.isbn,
            author: d.author.split(",")[0],
            category: d.category,
            stock: d.stock,
            action: (
              <div style={{ display: "flex" }}>
                <MDTypography
                  className={style.link}
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                  onClick={() => {
                    setOpenInfo(true);
                    setIndex(index);
                  }}
                  style={{ marginRight: "10px" }}
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
                    setOpenEditBook(true);
                    setIndex(index);
                  }}
                  style={{ marginRight: "10px" }}
                >
                  <EditIcon></EditIcon>
                  Edit
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
                    deleteBook(index, response.data);
                  }}
                >
                  <DeleteIcon></DeleteIcon>
                  Delete
                </MDTypography>
              </div>
            ),
          };
        });
        setRows(dataRows);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const deleteBook = (index, books) => {
    console.log("books", books);
    confirmPopUp(
      () => {
        console.log("books", books);
        privateAxios
          .delete("/admin/book/" + books[index]["_id"])
          .then((response) => {
            toast.success("Berhasil menghapus buku", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            fetchData();
          })
          .catch((error) => {
            console.error("error", error);
          });
      },
      () => {}
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MDBox pt={6} pb={3}>
      <AddBookModal
        open={openAddBook}
        fetchData={fetchData}
        setOpen={setOpenAddBook}
      ></AddBookModal>
      <InfoBookModal open={openInfo} setOpen={setOpenInfo} book={books[index]} />
      <EditBookModal
        fetchData={fetchData}
        open={openEditBook}
        setOpen={setOpenEditBook}
        book={books[index]}
      />
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
                Buku
              </MDTypography>
            </MDBox>
            <MDBox mx={2} mt={3}>
              <MDButton onClick={() => setOpenAddBook(true)} color="info">
                <AddIcon />
                Tambah Buku
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

export default Book;
