import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";

function FineHistoryPanel() {
  const columns = [
    { Header: "Jenis Denda", accessor: "name", align: "left" },
    { Header: "Tanggal Denda", accessor: "memberId", align: "left" },
    { Header: "Nominal", accessor: "email", align: "left" },
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

export default FineHistoryPanel;
