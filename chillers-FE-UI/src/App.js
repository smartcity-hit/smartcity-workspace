import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Alert from './Components/Alert';
import Navbar from './Components/Navbar';
import LoadingModal from './Components/LoadingModal';

import { initEnvironment } from './actions/user';
import { initChiller } from './actions/chiller';
import Routes from './routes/routes';

import './App.scss';

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
				{userData ? <Navbar /> : ''}
				<Routes />
				{/* userData && ? (
					<Alert
						type="error"
						description="An error occurred while trying to cool the water"
						code={1234}
						source="Chiller 1/A"
					/>
				) : (
					''
				)*/}
			</BrowserRouter>
		</div>
	);
};

export default App;
