/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import BigLoader from "components/Util/BigLoader/BigLoader";

// Material Dashboard 2 React example components
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useEffect, useState } from "react";
import { privateAxios } from "UtilRequests/util-axios";

// Dashboard components

function Dashboard() {
  const [bookCount, setBookCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [borrowingCount, setBorrowingCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(false);

  useEffect(() => {
    const bookCountRequest = privateAxios.get("/admin/book/total_count");
    const memberCountRequest = privateAxios.get("/admin/member/total_count");
    const borrowingCountRequest = privateAxios.get("/admin/borrowing/total_count");
    setLoadingCount(true);
    Promise.all([bookCountRequest, memberCountRequest, borrowingCountRequest])
      .then((responses) => {
        const bookCountResponse = responses[0];
        const memberCountResponse = responses[1];
        const borrowingCountResponse = responses[2];

        setBookCount(bookCountResponse.data.count);
        setMemberCount(memberCountResponse.data.count);
        setBorrowingCount(borrowingCountResponse.data.count);
        setLoadingCount(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }, []);

  return (
    <MDBox py={3}>
      <Grid style={{ position: "relative" }} justifyContent={"center"} container spacing={3}>
        {loadingCount == true && <BigLoader></BigLoader>}
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard icon="person" title="Anggota" count={memberCount} />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard color="dark" icon="book" title="Buku" count={bookCount} />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="bookmark"
              title="Peminjaman"
              count={borrowingCount}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Dashboard;
