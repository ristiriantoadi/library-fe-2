import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";

function BorrowingHistoryPanel() {
  const columns = [
    { Header: "Judul Buku", accessor: "name", align: "left" },
    { Header: "Tanggal Pinjam", accessor: "memberId", align: "left" },
    { Header: "Tanggal Kembali", accessor: "email", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
  ];
  const rows = [];
  return (
    <MDBox>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={true}
        showTotalEntries={true}
        noEndBorder
      />
    </MDBox>
  );
}

export default BorrowingHistoryPanel;
