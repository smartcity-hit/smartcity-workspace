import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MenuAppBar from "../../Components/MenuAppBar/MenuAppBar"
import { signInUser } from '../../actions/user';

import './index.scss';

const LoginPage = () => {
	const dispatch = useDispatch();
	const { userData, loading, error } = useSelector((state) => state.user);
	const history = useHistory();

	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	useEffect(() => {
		if (userData) {
			history.push('/MenuAppBar');
		}
	}, [userData, history]);

	const onChangeId = (e) => {
		const { value } = e.target;
		setUserId(value);
	};

	const onChangePassword = (e) => {
		const { value } = e.target;
		setPassword(value);
	};

	const onClickSubmit = () => {
		setUsernameError('');
		setPasswordError('');
		dispatch(signInUser({ userId, password }));
	};

	return !loading ? (
		<div className="login-page-wrapper">
			<div className="login-card">
				<h1 className="login-title">Login</h1>
				<form onSubmit={onClickSubmit} className="login-form">
					<div className="field-wrapper">
						<div className="row">
							<label htmlFor="user-id" className="field-label">
								ID
							</label>
							<input
								type="text"
								name="user-id"
								id="user-id"
								className="field-input"
								autoComplete="new-username"
								onChange={onChangeId}
							></input>
						</div>
						<div className="field-error">{usernameError}</div>
					</div>
					<div className="field-wrapper">
						<div className="row">
							<label htmlFor="password" className="field-label">
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								autoComplete="new-password"
								className="field-input"
								onChange={onChangePassword}
							></input>
						</div>
						<div className="field-error">{passwordError}</div>
					</div>
					<div className={`login-error ${error ? 'active' : ''}`}>
						<img src={require('../../assets/icons/error-icon.png')} alt="Error" />
						<label className="capitalize">{error && error.message}</label>
					</div>
					<button type="submit" className="signin-btn" disabled={!userId || !password}>
						Sign In
					</button>
				</form>
			</div>
		</div>
	) : (
		''
	);
};

export default LoginPage;
