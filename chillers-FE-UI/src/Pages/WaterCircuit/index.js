import React, { useState } from 'react';
import { ReactComponent as WaterTankLogo } from '../../assets/icons/water-tank.svg';
import { ReactComponent as BlueLine } from '../../assets/icons/blue-line.svg';
import { ReactComponent as AcIcon } from '../../assets/icons/ac-icon.svg';
import { ReactComponent as CompressorIcon } from '../../assets/icons/car-engine.svg';

import './index.scss';
import { useSelector } from 'react-redux';
import SelectChillerSection from '../../Components/SelectChillerSection';

const WaterCircuit = () => {
	const { activeChillerIndex, allChillers } = useSelector((state) => state.chiller);

	//now its 0 but we will change it
	const [waterCircuitState, setWaterCircuitState] = useState({
		coolingSetPointIn: 0,
		coolingSetPointOut: 0,
		waterTempIn: 0,
		waterTempOut: 0,
	});

	const getRow = (rowsArr, isArrowNeeded) => {
		return (
			<div className="water-circuit-row">
				{rowsArr.map((val, index) => (
					<div className="line-container" key={index}>
						{(index !== rowsArr.length - 1 && index !== 0) || !isArrowNeeded ? (
							<BlueLine className="blue-line-icon line-horizontal"></BlueLine>
						) : (
								<div className="arrow arrow-horizontal" key={index}>
									<div className="line"></div>
									<div className="point"></div>
								</div>
							)}
					</div>
				))}
			</div>
		);
	};
	const getColumn = (columnsArr) => {
		return (
			<div className="water-circuit-column">
				{columnsArr.map((val, index) => (
					<div className="line-container" key={index}>
						<BlueLine
							className={`blue-line-icon line-vertical ${index === columnsArr.length - 1 ? 'last' : ''
								}`}
						></BlueLine>
					</div>
				))}
			</div>
		);
	};

	const handleTempInput = (fieldName, fieldValue) => {
		if ((!isNaN(fieldValue) && parseInt(fieldValue) < 100) || fieldValue === '') {
			setWaterCircuitState({
				...waterCircuitState,
				[fieldName]: fieldValue,
			});
		}
	};

	const onPressSetButton = () => {
		console.log('Set button pressed');
	};

	let activeChiller;
	if (allChillers && allChillers.length) {
		activeChiller = allChillers[activeChillerIndex];
	}


	return (
		<div className="water-circuit-wrapper">
			<SelectChillerSection />
			<div className="row">
				<WaterTankLogo className="water-tank-icon"></WaterTankLogo>
				{getRow([1, 2, 3, 4, 5, 6], true)}
			</div>
			<div className="row width-755px">
				<div className="flex-start">{getColumn([1, 2, 3, 4])}</div>
				<div className="water-circuit-content">
					<div className="wc-fields-column left">
						<div className="field-container temp-out-container">
							<label className="temp-label" htmlFor="temp-out">
								Temp Out{' '}
								<span className="bold">
									{activeChiller && activeChiller.leavingWaterTemp}
									&deg;C
								</span>
							</label>
						</div>
						<div className="field-container setpoint-container">
							<label className="setpoint-label" htmlFor="set-point">
								Set Point
							</label>
							<input
								id="set-point"
								className="input-setpoint"
								type="text"
								value={waterCircuitState.coolingSetPointOut}
								maxLength={3}
								onChange={(e) => {
									handleTempInput('coolingSetPointOut', e.target.value);
								}}
							/>
							&deg;C
						</div>
						<div className="field-container temp-in-container">
							<label className="temp-label" htmlFor="temp-in">
								Temp In{' '}
								<span className="bold">
									{activeChiller && activeChiller.enteringWaterTemp}
									&deg;C
								</span>
							</label>
						</div>
					</div>
					<div className="wc-fields-column right">
						<button className="set-btn" onClick={onPressSetButton} disabled>
							{/* Not implemented yet */}
							Set
						</button>
					</div>
				</div>
				<div className="flex-end">
					<AcIcon className="ac-icon"></AcIcon>
					<AcIcon className="ac-icon"></AcIcon>
					<AcIcon className="ac-icon"></AcIcon>
					{getColumn([1, 2])}
				</div>
			</div>
			<div className="bottom-line">
				<CompressorIcon className="engine-icon"></CompressorIcon>
				{getRow([1, 2, 3, 4, 5])}
			</div>
		</div>
	);

};

export default WaterCircuit;
