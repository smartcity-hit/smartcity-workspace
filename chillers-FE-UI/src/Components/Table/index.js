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

function createData(
	createdAt,
	chillerState,
	controlPoint,
	demandLimit,
	enteringGasTemp,
	enteringWaterTemp,
	firstCircuitPressure,
	leavingGasTemp,
	leavingWaterTemp
) {
	return {
		createdAt,
		chillerState,
		controlPoint,
		demandLimit,
		enteringGasTemp,
		enteringWaterTemp,
		firstCircuitPressure,
		leavingGasTemp,
		leavingWaterTemp,
	};
}

const useStyles = makeStyles({
	root: {
		width: '100%',
		textAlign: 'center',
	},
	container: {
		maxHeight: '100vh',
	},
});

const StickyHeadTable = ({ cols, rows }) => {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const columns = cols;
	var newRows = [];
	rows.forEach((row) => {
		row.createdAt = row.createdAt.replace('T', ' ').split('.')[0];
		newRows.push(
			createData(
				row.createdAt,
				row.chillerState,
				row.controlPoint,
				row.demandLimit,
				row.enteringGasTemp,
				row.enteringWaterTemp,
				row.firstCircuitPressure,
				row.leavingGasTemp,
				row.leavingWaterTemp
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

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth, textAlign: index !== 0 ? 'center' : 'left' }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody style={{ textAlign: 'center' }}>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={index}>
									{columns.map((column, index) => {
										const value = row[column.id];
										return (
											<TableCell
												key={column.id}
												align={column.align}
												style={{ textAlign: index !== 0 ? 'center' : 'left' }}
											>
												{column.format && typeof value === 'number' ? column.format(value) : value}
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
};

export default StickyHeadTable;
