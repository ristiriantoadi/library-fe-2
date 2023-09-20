import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { useState } from "react";
import AddBookModal from "./AddBookModal";

function Book() {
  const columns = [
    { Header: "Judul", accessor: "title", align: "left" },
    { Header: "ISBN", accessor: "isbn", align: "left" },
    { Header: "Penulis", accessor: "author", align: "left" },
    { Header: "Penerbit", accessor: "publisher", align: "left" },
    { Header: "Stok", accessor: "stock", align: "left" },
    { Header: "Aksi", accessor: "action", align: "center" },
  ];
  const rows = [];
  const [openAddBook, setOpenAddBook] = useState(false);

  return (
    <MDBox pt={6} pb={3}>
      <AddBookModal open={openAddBook} setOpen={setOpenAddBook}></AddBookModal>
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
