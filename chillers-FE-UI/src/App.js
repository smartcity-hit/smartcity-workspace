import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter,Switch } from 'react-router-dom';

import LoadingModal from './Components/LoadingModal/LoadingModal';
import MenuAppBar from './Components/MenuAppBar/MenuAppBar';

import { initEnvironment } from './actions/user';
import { initChiller } from './actions/chiller';
import Routes from './routes/routes';

import './App.scss';
import LoginPage from './Pages/LoginPage';

const App = () => {
	const { userData, loading } = useSelector((state) => state.user);
	const { chillerLoading } = useSelector((state) => state.chiller);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initEnvironment());
		dispatch(initChiller());
	}, [dispatch]);

	return (
		<div className="App">
			<LoadingModal isModalOpen={loading || chillerLoading} />
			<BrowserRouter>
				{userData ? < MenuAppBar/> : ''}
				<Routes />
				{}
			</BrowserRouter>
		</div>
	);
};

export default App;
