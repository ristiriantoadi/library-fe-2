import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { privateAxios } from "UtilRequests/util-axios";

function FineHistoryPanel(props) {
  FineHistoryPanel.propTypes = {
    member: PropTypes.object,
  };
  const columns = [
    { Header: "Jenis Denda", accessor: "feeType", align: "left" },
    { Header: "Tanggal Denda", accessor: "createTime", align: "left" },
    { Header: "Nominal", accessor: "amount", align: "left" },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log("member id", props.member["_id"]);
    privateAxios
      .get("/admin/fee", { params: { userId: props.member["_id"] } })
      .then((response) => {
        console.log(response);
        let rows = response.data.map((fee) => {
          return {
            feeType: fee["feeType"],
            createTime: new Date(fee["createTime"]).toDateString(),
            amount: fee["amount"].toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0, // Remove decimal places for whole numbers
            }),
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

export default FineHistoryPanel;
