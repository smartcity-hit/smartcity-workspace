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
import { Link } from 'react-router-dom';
import {useLocation} from  'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height:'400%',
    align: "center",
    
  },
  Pagination:{
    display:'flex',
    justifyContent: 'center',  
    width: "100%",  
    alignItems: 'left',
    padding:'0px',
  },
  row:{
    height: 100,
    textAlign:'inherit',
  },
  cell:{
    height: 100,
    padding:'50px',
  },
  
});

const DevicesList = ({ rows, cols }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
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
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return ( 
              
                <TableRow align="center" hover role="checkbox" tabIndex={-1} key={row.name} className={classes.row} >
                  <Link to="/counter/details">
                  <TableCell align="center" component="th" scope="row" className={`nav-link ${pathname.includes('/counter/details') && activeTab === 0 ? 'active' : ''}` ,classes.cell} >
                    {row.name}
                  </TableCell>
                  </Link>
                  <TableCell align="center">{row.host}</TableCell>
                  <TableCell align="center">{row.createdAt}</TableCell>
                </TableRow> 
              ); 
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination 
      className={classes.Pagination}
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

export default DevicesList;
