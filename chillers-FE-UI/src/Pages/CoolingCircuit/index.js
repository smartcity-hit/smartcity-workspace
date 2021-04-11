import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ReactComponent as BlueLine } from '../../assets/icons/blue-line.svg';
import condenser from '../../assets/icons/condenser.svg';
import circuitBreaker from '../../assets/icons/circuit-breaker.svg';
import compressorIcon from '../../assets/icons/car-engine.svg';

import './index.scss';
import SelectChillerSection from '../../Components/SelectChillerSection';

const CoolingCircuit = () => {
	const { activeChillerIndex } = useSelector((state) => state.chiller);
	const { compressors } = useSelector(
		(state) => state.chiller.allChillers[activeChillerIndex].coolingCircuit
	);

	useEffect(() => {
		window.scrollTo(0, 50);
	});

	console.log('CoolingCircuit Compressors: ', compressors);

	const compressorsState = compressors.map((compressor) => (compressor ? 'RUN' : 'OFF'));

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
							className={`blue-line-icon line-vertical ${
								index === columnsArr.length - 1 ? 'last' : ''
							}`}
						></BlueLine>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="cooling-circuit-wrapper">
			<SelectChillerSection />
			<div className="water-circuit-row">
				<img src={condenser} alt="condenser" className="condenser" />
				{getRow([1, 2, 3, 4, 5, 6, 7], true)}
			</div>
			<div className="water-circuit-row space-between">
				<div className="left-column external column">{getColumn([1, 2, 3, 4])}</div>
				<div className="right-column external column">
					{getColumn([1], false)}
					<img src={circuitBreaker} alt="circuit Breaker" className="circuit-breaker" />
					{getColumn([1, 2, 3])}
				</div>
			</div>
			<div className="water-circuit-row b-compressors">
				{getRow([1], false)}
				<div className="compressors-with-state-container">
					{compressorsState.slice(0, 4).map((compState, index) => (
						<div className="compressor-with-state" key={index}>
							<img src={compressorIcon} className="compressor-icon" alt="compressorIcon" />
							<span className={`compressor-state ${compState === 'RUN' ? 'active' : ''}`}>
								{compState}
							</span>
						</div>
					))}
				</div>
				{getRow([1, 2], false)}
			</div>
			<div className="water-circuit-internal">
				<div className="water-circuit-row">
					<img src={condenser} alt="condenser" className="condenser" />
					{getRow([1, 2, 3, 4, 5], true)}
				</div>
				<div className="water-circuit-row space-between">
					<div className="left-column internal column">{getColumn([1, 2, 3])}</div>
					<div className="right-column internal column">
						{getColumn([1], false)}
						<img src={circuitBreaker} alt="circuit Breaker" className="circuit-breaker" />
						{getColumn([1])}
					</div>
				</div>
				<div className="water-circuit-row a-compressors">
					{getRow([1], false)}
					<div className="compressors-with-state-container">
						{compressorsState.slice(4).map((compState, index) => (
							<div className="compressor-with-state" key={index}>
								<img src={compressorIcon} className="compressor-icon" alt="compressorIcon" />
								<span className={`compressor-state ${compState === 'RUN' ? 'active' : ''}`}>
									{compState}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoolingCircuit;