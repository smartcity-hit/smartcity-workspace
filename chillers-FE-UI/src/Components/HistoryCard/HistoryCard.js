import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tabel:{
    width: 80,
  },
});

const HistoryCard=({rows,cols})=> {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table className={classes.tabel} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {cols.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                        <TableCell align="center">{row.counterName}</TableCell>
                        <TableCell align="center">{row.i1}</TableCell>
                        <TableCell align="center">{row.i2}</TableCell>
                        <TableCell align="center">{row.i3}</TableCell>
                        <TableCell align="center">{row.n_v1}</TableCell>
                        <TableCell align="center">{row.n_v2}</TableCell>
                        <TableCell align="center">{row.n_v3}</TableCell>
                        <TableCell align="center">{row.v1_v2}</TableCell>
                        <TableCell align="center">{row.v1_v3}</TableCell>
                        <TableCell align="center">{row.v2_v3}</TableCell>
                        <TableCell align="center">{row.cos}</TableCell>
                        <TableCell align="center">{row.updatedAt}</TableCell>
                    </TableRow>
                    );
                  })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default HistoryCard;
