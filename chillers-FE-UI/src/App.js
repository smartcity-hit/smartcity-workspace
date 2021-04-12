import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import LoadingModal from './Components/LoadingModal/LoadingModal';
import { MenuAppBar } from './Components/MenuAppBar/MenuAppBar';

import { initEnvironment } from './redux/User-Details/user-details-actions';
import Routes from './routes/routes';
import './App.scss';

const App = () => {
	const { userData, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initEnvironment());
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
