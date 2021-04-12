import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import LoadingModal from './Components/LoadingModal/LoadingModal';
import { MenuAppBar } from './Components/MenuAppBar/MenuAppBar';

import { initEnvironment } from './redux/User-Details/user-details-actions';
import { initChiller } from './redux/Chiller-Details/chiller-details-actions';
import Routes from './routes/routes';
import { initCounters } from './redux/Counters-List/counters-list-actions';
import './App.scss';

const App = () => {
	const { userData, loading } = useSelector((state) => state.user);
	//const { chillerLoading } = useSelector((state) => state.chiller);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initEnvironment());
		//dispatch(initChiller());
		//dispatch(initCounters());
	}, [dispatch]);

	return (
		<div className="App">
			<LoadingModal isModalOpen={loading} />
			<BrowserRouter>
				{userData ? < MenuAppBar /> : ''}
				<Routes />
				{ }
			</BrowserRouter>
		</div>
	);
};

export default App;
