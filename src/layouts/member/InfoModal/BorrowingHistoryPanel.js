import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { privateAxios } from "UtilRequests/util-axios";

function BorrowingHistoryPanel(props) {
  BorrowingHistoryPanel.propTypes = {
    member: PropTypes.object,
  };
  const columns = [
    { Header: "Judul Buku", accessor: "title", align: "left" },
    { Header: "Tanggal Pinjam", accessor: "memberId", align: "left" },
    { Header: "Tanggal Kembali", accessor: "email", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    privateAxios
      .get("/admin/borrowing", { params: { memberId: props.member["_id"] } })
      .then((response) => {
        console.log("response", response.data);
        let rows = response.data.map((borrow) => {
          return {
            title: borrow["book"]["title"],
            status: borrow["status"],
          };
        });
        setRows(rows);
      })
      .catch((error) => {});
  }, []);

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
