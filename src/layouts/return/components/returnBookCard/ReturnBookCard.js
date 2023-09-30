import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { addDate, dateDifference, formatCurrency, getDate } from "util/util";
import {
  BORROW_DURATION,
  DAMAGE_BOOK_FEE,
  LATE_FEE_PER_DAY,
  LOST_BOOK_FEE,
} from "util/util_constant";
import style from "./style.module.css";

function ReturnBookCard(props) {
  ReturnBookCard.propTypes = {
    book: PropTypes.object,
    bookUpdated: PropTypes.func,
    // checked: PropTypes.func,
  };
  const [lateDays, setLateDays] = useState();
  const [lateFee, setLatefee] = useState();
  const [lostDamageFee, setLostDamageFee] = useState();
  const [totalFee, setTotalFee] = useState();
  const [bookCondition, setBookCondition] = useState("Baik");
  const [checked, setChecked] = useState(false);

  const calculateLateDays = () => {
    let difference = dateDifference(
      new Date(getDate(new Date())),
      new Date(getDate(addDate(new Date(props.book.borrowTime), BORROW_DURATION)))
    );
    if (difference < 0) difference = 0;
    return difference;
  };

  const calculateLateFee = (lateDays) => {
    return lateDays * LATE_FEE_PER_DAY;
  };

  useEffect(() => {
    let lostDamageFee = 0;
    if (bookCondition === "Hilang") {
      setLostDamageFee(LOST_BOOK_FEE);
      lostDamageFee = LOST_BOOK_FEE;
    } else if (bookCondition == "Rusak") {
      setLostDamageFee(DAMAGE_BOOK_FEE);
      lostDamageFee = DAMAGE_BOOK_FEE;
    } else {
      setLostDamageFee(0);
    }

    const lateDays = calculateLateDays();
    const lateFee = calculateLateFee(lateDays);

    setLateDays(lateDays);
    setLatefee(lateFee);
    setTotalFee(lateFee + lostDamageFee);
    props.book.totalFee = lateFee + lostDamageFee;
    props.book.lateFee = lateFee;
    props.book.lostDamageFee = lostDamageFee;
    props.book.condition = bookCondition;
  }, [bookCondition]);

  useEffect(() => {
    props.book.checked = checked;
  }, [checked]);

  useEffect(() => {
    props.bookUpdated();
  });

  return (
    <Card style={{ marginBottom: "20px", padding: "10px 5px" }}>
      <Grid container spacing={1}>
        <Grid xs={10} item p={1} mx={1} spacing={3} container>
          <Grid item xs={6}>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Judul
              </MDTypography>
              <MDTypography variant="body2">{props.book.title}</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Penulis
              </MDTypography>
              {props.book.author.split(",").map((author, index) => {
                return (
                  <MDTypography key={index} variant="body2">
                    {author}
                  </MDTypography>
                );
              })}
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Durasi Peminjaman
              </MDTypography>
              <MDTypography variant="body2">{BORROW_DURATION} hari</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Keterlambatan
              </MDTypography>
              <MDTypography variant="body2">{lateDays} hari</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" mb={1} fontWeight="bold">
                Kondisi Buku
              </MDTypography>
              <FormControl fullWidth>
                <InputLabel>Kondisi</InputLabel>
                <Select
                  onChange={(e) => setBookCondition(e.target.value)}
                  value={bookCondition}
                  style={{ height: "44px" }}
                  label="category"
                >
                  <MenuItem value="Baik">Baik</MenuItem>
                  <MenuItem value="Rusak">Rusak</MenuItem>
                  <MenuItem value="Hilang">Hilang</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
          </Grid>
          <Grid item xs={6}>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                ISBN
              </MDTypography>
              <MDTypography variant="body2">{props.book.isbn}</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Penerbit
              </MDTypography>
              <MDTypography variant="body2">{props.book.publisher}</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Jadwal Pengembalian
              </MDTypography>
              <MDTypography variant="body2">
                {addDate(new Date(props.book.borrowTime), BORROW_DURATION).toDateString()}
              </MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Denda
              </MDTypography>
              <MDTypography variant="body2">{formatCurrency(lateFee)}</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Denda Kerusakan/Kehilangan Buku
              </MDTypography>
              <MDTypography variant="body2">{formatCurrency(lostDamageFee)}</MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography variant="body2" fontWeight="bold">
                Total Denda
              </MDTypography>
              <MDTypography variant="body2">Rp. {totalFee}</MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        <Grid className={style.checkBoxGrid} item>
          <input
            onChange={(e) => setChecked(e.target.checked)}
            style={{ minWidth: "30px", minHeight: "30px" }}
            type="checkbox"
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default ReturnBookCard;
