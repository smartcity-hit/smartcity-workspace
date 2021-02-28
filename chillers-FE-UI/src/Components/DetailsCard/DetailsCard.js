import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider, TableRow } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';


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
    width: '30%',
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

function createData(state, location, counterName) {
  return { state, location, counterName };
}

const rows = [
  { id: 'counterName', label: 'Counter Name:', minWidth: 300 },
  { id: 'location', label: 'Location:', minWidth: 100 },
  { id: 'createdDate', label: 'Created Date:', minWidth: 300 }
];

const DetailsCard = ({ cols }) => {
  const classes = useStyles1();

  var newCols = [];
  cols.forEach((col) => {
    newCols.push(
      createData(
        col.location,
        col.counterName,
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
          <TableCell align='rigth' className={classes.cell}>
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