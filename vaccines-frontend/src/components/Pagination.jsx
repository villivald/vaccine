import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Switch,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  Paper,
  IconButton,
} from "@material-ui/core/";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Vaccination from "./Vaccination";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const CustomPaginationActionsTable = ({ rows, vaccines }) => {
  const [idFilter, setIdFilter] = useState("");
  const [bottleFilter, setBottleFilter] = useState("");
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByGender, setSortByGender] = useState(false);

  const handleIdFilterChange = (event) => {
    setIdFilter(event.target.value);
  };
  const handleBottleFilterChange = (event) => {
    setBottleFilter(event.target.value);
  };

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <h2>Sort by</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        Date: <Switch onChange={() => setSortByDate(!sortByDate)} />
        Gender: <Switch onChange={() => setSortByGender(!sortByGender)} />
      </div>

      <h2>Filter by</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div>
          <TextField
            id="standard-basic"
            label="Vaccination Id"
            onChange={handleIdFilterChange}
            placeholder="6ae207d9-6fa9-4b62..."
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Bottle Source"
            onChange={handleBottleFilterChange}
            placeholder="75ae9638-3ad5-4433..."
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Source Bottle</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Responsible Person</TableCell>
              <TableCell align="right">Area</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            )
              .sort((max, min) =>
                sortByDate
                  ? new Date(max.vaccinationDate).getTime() -
                    new Date(min.vaccinationDate).getTime()
                  : max.vaccinationDate - min.vaccinationDate
              )
              .sort((a, b) => sortByGender && (a.gender > b.gender ? 1 : -1))
              .filter((vaccine) => vaccine["vaccination-id"].includes(idFilter))
              .filter((vaccine) => vaccine.sourceBottle.includes(bottleFilter))
              .map((vaccination) => (
                <Vaccination
                  key={vaccination["vaccination-id"]}
                  vaccination={vaccination}
                  vaccines={vaccines}
                />
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  10,
                  50,
                  100,
                  500,
                  { label: "All", value: -1 },
                ]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomPaginationActionsTable;
