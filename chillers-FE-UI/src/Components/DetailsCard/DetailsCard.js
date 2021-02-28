import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableRow } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';




  const useStyles1 = makeStyles({
    root: {
        width: '30%',
        align:"center",
    
      },
      table: {
        minWidth: 300,
      },
    cell:{
        width:'50%',
        textAlign:'start'
    },
 
  });

function createData(state, location, createdDate) {
    return { state, location, createdDate };
  }

  

  const rows=[
    { id: 'state', label: 'State:', minWidth: 100 },
    { id: 'location', label: 'Location:', minWidth: 100 },
    { id: 'createdDate', label: 'Created Date:', minWidth: 300 },
  ];

const DetailsCard=({cols})=> {
  const classes = useStyles1();
  const [page, setPage] = React.useState(0);

  var newCols = [];
  cols.forEach((col) => {
    newCols.push(
          createData(
              col.state,
              col.location,
              col.createdDate
          )
      );
  });

  return (
    <Paper className={classes.root}>
 
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody >
          <TableCell className={classes.cell}  width='100%'>
          {rows.map((row) => (
                <TableRow key={row.id} className={classes.cell} component="th" scope="row">{row.label}</TableRow>
              ))}
        </TableCell>
        <TableCell className={classes.cell}>
              {cols.map((col) => {
                  return(
                   <TableCell>
                    {rows.map((row) => {
                        const value= col[row.id];
                        return(
                            <TableRow key={row.id} 
                            align={row.align} 
                            style={{textAlign:'start' }}>{row.format && typeof value === 'number' ? row.format(value) : value}</TableRow>
                           
                          );
                        })}
                       
                       </TableCell>
                  );
                })}
          </TableCell>

    </TableBody>
    
        </Table>

    </Paper>
  );
}

export default DetailsCard;