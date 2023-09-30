import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { addDate } from "util/util";
import { BORROW_DURATION } from "util/util_constant";
import { privateAxios } from "UtilRequests/util-axios";

function BorrowingHistoryPanel(props) {
  BorrowingHistoryPanel.propTypes = {
    member: PropTypes.object,
  };
  const columns = [
    { Header: "Judul Buku", accessor: "title", align: "left" },
    { Header: "Tanggal Pinjam", accessor: "borrowDate", align: "left" },
    { Header: "Tanggal Kembali", accessor: "returnDate", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    privateAxios
      .get("/admin/borrowing", { params: { memberId: props.member["_id"] } })
      .then((response) => {
        let rows = response.data.map((borrow) => {
          return {
            title: borrow["book"]["title"],
            status: borrow["status"],
            borrowDate: new Date(borrow["createTime"]).toDateString(),
            returnDate: addDate(new Date(borrow["createTime"]), BORROW_DURATION).toDateString(),
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
