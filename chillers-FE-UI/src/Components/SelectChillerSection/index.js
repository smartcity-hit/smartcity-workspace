import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllChillersData, setActiveChiller } from '../../actions/chiller';

import './index.scss';

const SelectChillerSection = () => {
	const dispatch = useDispatch();
	const { activeChillerIndex, allChillers } = useSelector((state) => state.chiller);

	const onChangeChiller = (e) => {
		const chillerSelectedIndex = parseInt(e.target.value);
		console.log(`SelectedChillerSection selected chiller: Chiller ${chillerSelectedIndex + 1}`);
		dispatch(setActiveChiller(chillerSelectedIndex));
	};

	const onClickRefreshBtn = () => {
		dispatch(getAllChillersData());
	};

	return allChillers.length ? (
		<div className="select-chillers-section-wrapper">
			<select className="chillers-select" value={activeChillerIndex} onChange={onChangeChiller}>
				{allChillers.map((chiller, index) => (
					<option key={index} className="chiller-option" value={index}>{`Chiller ${
						index + 1
					}`}</option>
				))}
			</select>
			<button onClick={onClickRefreshBtn} className="refresh-btn">
				Refresh Chillers Data
			</button>
		</div>
	) : (
		''
	);
};

export default SelectChillerSection;
