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
import { useLocation } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'ip', label: 'Ip', minWidth: 100 },
  {
    id: 'createdDate',
    label: 'Created Date',
    minWidth: 100,
    align: 'right',
  },
 
];



 function createData(name, ip, createdDate) {
  return { name, ip, createdDate };
}

const ROW_DATA = [
    createData(
        'counter1',
        '172.16.11.203',
        '12/01/2021'
    ),
    createData(
        'counter2',
        '172.16.11.204',
        '12/01/2021'
    ),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    align:"center",
  

  },
  container: {
    maxHeight: 300,
    

  },
});

 const DevicesList = ({rows,cols}) => {
    const { pathname } = useLocation();
    const [activeTab, setActiveTab] = React.useState(0);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = cols;


	var newRows = [ROW_DATA];
	rows.forEach((row) => {
		newRows.push(
			createData(
				row.name,
				row.ip,
				row.createdDate
			)
		);
    });

  
    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickTab = (tabClicked) => {
    setActiveTab(tabClicked);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
              
                <TableRow hover role="checkbox" tabIndex={-1} key={index}
                >
                  {columns.map((column,index) => {
                    const value = row[column.id];
                    return (
                     
                      <TableCell key={column.id} 
                      align={column.align} 
                      style={{ textAlign: index !== 0 ? 'center' : 'left' }} 
                       >
                        <Link to="/CounterDetails">
                        {column.format && typeof value === 'number' ? column.format(value) : value} 
                         </Link>
                      </TableCell>
                    
                       
                    );
                  })}
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

export default DevicesList;
