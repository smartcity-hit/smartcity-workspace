import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableRow } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    textAlign: 'left'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


const useStyles1 = makeStyles({
  root: {
    width: '40%',
    align: "center",

  },
  table: {
    minWidth: 300,
  },
  cell: {
    width: '50%',
    textAlign: 'start'
  },

});

function createData(counterName, counterIP, counterLocation, createdDate) {
  return { counterName, counterIP, counterLocation, createdDate };
}

const rows = [
  { id: 'counterName', label: 'Counter Name:', minWidth: 300 },
  { id: 'counterIP', label: 'IP:', minWidth: 300 },
  { id: 'counterLocation', label: 'Location:', minWidth: 100 },
  { id: 'createdDate', label: 'Created Date:', minWidth: 300 }
];

const DetailsCard = ({ cols }) => {
  const classes = useStyles1();
  console.log(cols)
  var newCols = [];
  cols.forEach((col) => {
    newCols.push(
      createData(
        col.counterName,
        col.counterIP,
        col.counterLocation,
        col.createdDate
      )
    );
  });

  return (
    <Paper className={classes.root}>

      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody >
          <TableCell className={classes.cell} width='100%' >
            {rows.map((row) => (

              <TableRow key={row.id} className={classes.cell} component="th" scope="row"   >
                {row.label}
              </TableRow>

            ))}
          </TableCell>
          <TableCell align='right' className={classes.cell}>
            {cols.map((col) => {
              return (

                <TableCell align="right">
                  {rows.map((row, index) => {
                    const value = col[row.id];
                    return (
                      <TableRow key={row.id}
                        align={row.align}
                        style={{ textAlign: 'start' }}
                      >
                        {row.format && typeof value === 'number' ? row.format(value) : value}

                      </TableRow>

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