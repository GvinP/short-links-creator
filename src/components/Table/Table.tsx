import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getStatictic, setSuccess } from "../../store/linksReducer";
import { useClipboard } from "use-clipboard-copy";
import { CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

type Order = "asc" | "desc";
const headCells = ["short", "target", "counter"];

export const LinksTable = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [orderBy, setOrderBy] = useState<string>("short");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const dispatch = useAppDispatch();
  const links = useAppSelector((state) => state.links.links);
  const isLoading = useAppSelector((state) => state.links.isLoading);
  const allLinksCount = useAppSelector((state) => state.links.allLinks.length);
  const clipboard = useClipboard();
  const classes = useStyles();

  useEffect(() => {
    dispatch(
      getStatictic({
        order: `${order}_${orderBy}`,
        limit: rowsPerPage,
        offset: currentPage * rowsPerPage,
      })
    );
  }, [rowsPerPage, currentPage, order, orderBy, dispatch]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    headCell: string
  ) => {
    const isAsc = orderBy === headCell && order === "desc";
    setOrder(isAsc ? "asc" : "desc");
    setOrderBy(headCell);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const copyToClipboard = (link: string) => {
    clipboard.copy(`http://79.143.31.216/s/${link}`);
    dispatch(setSuccess("Link copied!"));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 600 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell}
                    align={"center"}
                    sortDirection={orderBy === headCell ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell}
                      direction={orderBy === headCell ? order : "asc"}
                      onClick={(e) => handleRequestSort(e, headCell)}
                    >
                      {headCell}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell />
                  <TableCell className={classes.loadingContainer}>
                    <CircularProgress size={"3rem"} />
                  </TableCell>
                  <TableCell />
                </TableRow>
              ) : (
                <>
                  {links.map((link) => {
                    return (
                      <TableRow hover key={link.id}>
                        <TableCell
                          align={"center"}
                          onClick={() => copyToClipboard(link.short)}
                          className={classes.link}
                        >
                          {link.short}
                        </TableCell>
                        <TableCell
                          align={"center"}
                          className={classes.linkContainer}
                        >
                          <a
                            href={link.target}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {link.target}
                          </a>
                        </TableCell>
                        <TableCell align={"center"}>{link.counter}</TableCell>
                      </TableRow>
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Math.ceil(allLinksCount)}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
