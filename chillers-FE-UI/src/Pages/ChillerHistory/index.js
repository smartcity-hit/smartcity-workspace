import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ApiService from '../../services/ApiService';
import Table from '../../Components/Table';

import './index.scss';

const ChillerHistory = () => {
	const [chillerId, setChillerId] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [minRange, setMinRange] = useState(null);
	const [error, setError] = useState('');

	const [currentChillerHistory, setCurrentChillerHistory] = useState([]);

	const { allChillers } = useSelector((state) => state.chiller);

	const cols = [
		{ id: 'createdAt', label: 'Date', minWidth: 140 },
		{ id: 'chillerState', label: 'Chiller State', minWidth: 140 },
		{ id: 'controlPoint', label: 'Control Point', minWidth: 140 },
		{ id: 'demandLimit', label: 'Demand Limit', minWidth: 140 },
		{ id: 'enteringWaterTemp', label: 'Entering WaterTemp', minWidth: 140 },
		{
			id: 'firstCircuitPressure',
			label: 'First Circuit Pressure',
			minWidth: 140,
		},
		{ id: 'leavingWaterTemp', label: 'Leaving WaterTemp', minWidth: 140 },
	];

	useEffect(() => {
		const timeFormatted = convertTimeFormat(new Date());
		setEndDate(timeFormatted);
	}, []);

	useEffect(() => {
		setInputTimeRanges();
	}, [minRange]);

	const renderOptions = (options) => {
		return options.map((opt, index) => {
			return (
				<option key={index} className="field-option" value={index + 1}>
					{index + 1}
				</option>
			);
		});
	};

	const setToMinTime = (pickedStartTime, minChillerPossibleTime) => {
		if (!pickedStartTime) {
			document.getElementById('date-field-to').setAttribute('min', minChillerPossibleTime);
			return;
		} else if (endDate && new Date(pickedStartTime) > new Date(endDate)) {
			console.log('PICKKK', pickedStartTime);
			setEndDate(pickedStartTime);
		}
		const dates = [new Date(pickedStartTime), new Date(minChillerPossibleTime)];
		const maxDate = new Date(Math.max(...dates));
		const formattedMaxDate = convertTimeFormat(maxDate);
		console.log('formattedMaxDate', formattedMaxDate);
		document.getElementById('date-field-to').setAttribute('min', formattedMaxDate);
	};

	const handleStartDate = (pickedStartDate) => {
		setStartDate(pickedStartDate);
		setToMinTime(pickedStartDate, minRange);
	};

	const handleEndDate = (pickedEndDate) => {
		setEndDate(pickedEndDate);
	};

	const handleChangeChillerId = async (id) => {
		try {
			const res = await ApiService.getChillerDateRange(id);
			if (res && res.initial_date) {
				setChillerId(id);
				setMinRange(res.initial_date);
				setInputTimeRanges();
			}
		} catch (err) {
			console.log('chillerHistory handleChangeChillerId Errorr: ', err);
		}
	};

	const setInputTimeRanges = () => {
		let min = minRange ? new Date(minRange) : new Date();
		const formattedMinDate = convertTimeFormat(min);
		if (minRange) {
			document.getElementById('date-field-from').setAttribute('min', formattedMinDate);
			setToMinTime(startDate, formattedMinDate);
		} else {
			document.getElementById('date-field-from').setAttribute('max', formattedMinDate);
			document.getElementById('date-field-to').setAttribute('max', formattedMinDate);
		}
	};

	const convertTimeFormat = (time) => {
		if (typeof time === 'string' && time.split('-').length === 3) {
			return time; // Already formatted
		}
		let dd = time.getDate();
		let mm = time.getMonth() + 1; // January is 0!
		const yyyy = time.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}

		const formattedDateString = yyyy + '-' + mm + '-' + dd;
		return formattedDateString;
	};

	const onClickSearch = async (chillerId, startDate, endDate) => {
		if (chillerId === '' || startDate === '' || endDate === '') {
			setError('Please fill all the fields');
		} else if (startDate > endDate) {
			setError('Start date cannot be bigger than end date');
		} else {
			try {
				const chillerHistory = await ApiService.getChillerHistory(chillerId, startDate, endDate);
				if (chillerHistory) {
					setError('');
					setCurrentChillerHistory(chillerHistory);
				}
			} catch (err) {
				console.log('chillerHistory onClickSearch Error: ', err);
			}
		}
	};

	return (
		<div className="chiller-history-wrapper">
			<p className="error-msg">{error}</p>
			<div className="chiller-history-form">
				<div className="id-input-wrapper">
					<label htmlFor="chiller-id" className="field-label">
						Chiller ID
					</label>
					<select
						name="chiller-id"
						className="chiller-id-select"
						id="chiller-id"
						value={chillerId}
						onChange={(e) => {
							handleChangeChillerId(e.target.value);
						}}
					>
						<option className="field-option" value=""></option>
						{renderOptions(allChillers)}
					</select>
				</div>
				<div className="date-input-wrapper">
					<label className="date-label" htmlFor="startDate">
						From
					</label>
					<input
						type="date"
						id="date-field-from"
						value={startDate}
						onChange={(e) => handleStartDate(e.target.value)}
						disabled={!chillerId}
						min="2000-13-12"
						max="2000-13-13"
					/>
				</div>
				<div className="date-input-wrapper">
					<label className="date-label" htmlFor="startDate">
						To
					</label>
					<input
						type="date"
						id="date-field-to"
						value={endDate}
						onChange={(e) => handleEndDate(e.target.value)}
						disabled={!chillerId}
						min="2000-13-12"
						max="2000-13-13"
					/>
				</div>
				<button
					className="history-btn"
					onClick={() => onClickSearch(chillerId, startDate, endDate)}
				>
					Search
				</button>
			</div>
			{currentChillerHistory && currentChillerHistory.length ? (
				<div className="table-wrapper">
					<Table cols={cols} rows={currentChillerHistory} />
				</div>
			) : null}
		</div>
	);
};

export default ChillerHistory;
