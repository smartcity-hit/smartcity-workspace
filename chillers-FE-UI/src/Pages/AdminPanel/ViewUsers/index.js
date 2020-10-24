import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUserById, editUser } from '../../../actions/user';
import GeneralModal from '../../../Components/GeneralModal';
import './index.scss';

const defaultEditedValues = {
	fullName: '',
	userType: '',
	phone: '',
	email: '',
};

const ViewUsers = () => {
	const { allUsersList } = useSelector((state) => state.user);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userToDeleteId, setUserToDeleteId] = useState(null);

	const [userToEditId, setUserToEditId] = useState(null);
	const [editedValues, setEditedValues] = useState(defaultEditedValues);
	const [isEditConfirmEnabled, setIsEditConfirmEnabled] = useState(false);

	const dispatch = useDispatch();

	const renderUsers = (allUsersList) => {
		return allUsersList.map((user, index) => {
			return (
				<tr className="tr-wrapper" key={index}>
					<td className="td-wrapper">
						<input type="text" className="user-field-input" value={user.id} disabled />
					</td>
					<td className="td-wrapper">
						<input
							type="text"
							className={`user-field-input ${userToEditId === user.id ? 'active' : ''}`}
							value={userToEditId === user.id ? editedValues.fullName : user.fullName}
							onChange={(e) => {
								onChangeField('fullName', e.target.value);
							}}
							disabled={userToEditId !== user.id}
						/>
					</td>
					<td className="td-wrapper">
						<input
							type="text"
							className="user-field-input"
							value={user.userType === '1' ? 'Admin' : 'User'}
							disabled
						/>
					</td>
					<td className="td-wrapper">
						<input
							type="text"
							className={`user-field-input ${userToEditId === user.id ? 'active' : ''}`}
							value={userToEditId === user.id ? editedValues.phone : user.phone}
							onChange={(e) => {
								onChangeField('phone', e.target.value);
							}}
							disabled={userToEditId !== user.id}
						/>
					</td>
					<td className="td-wrapper">
						<input
							type="email"
							className={`user-field-input ${userToEditId === user.id ? 'active' : ''}`}
							value={userToEditId === user.id ? editedValues.email : user.email}
							onChange={(e) => {
								onChangeField('email', e.target.value);
							}}
							disabled={userToEditId !== user.id}
						/>
					</td>
					<td className="td-wrapper">
						<input
							type="text"
							className="user-field-input"
							value={fixDate(user.createdAt)}
							disabled
						/>
					</td>
					<td className="td-wrapper">
						{
							<div className="td-icons">
								<i
									className={`fas fa-pencil-alt icon ${
										userToEditId === user.id && isEditConfirmEnabled ? 'edit-active' : ''
									}`}
									onClick={() => {
										onClickEditIcon(user);
									}}
								></i>
								<i
									className="fas fa-trash-alt icon"
									onClick={() => {
										onClickDeleteIcon(user.id);
									}}
								></i>
							</div>
						}
					</td>
				</tr>
			);
		});
	};

	const onChangeField = (fieldName, fieldInput) => {
		setEditedValues({ ...editedValues, [fieldName]: fieldInput });
		if (!isEditConfirmEnabled) {
			setIsEditConfirmEnabled(true);
		}
	};

	const onClickEditIcon = (user) => {
		if (user.id !== userToEditId) {
			console.log('viewUsers UserToEdit: ', user);
			setUserToEditId(user.id);
			setEditedValues({
				fullName: user.fullName,
				userType: user.userType,
				phone: user.phone,
				email: user.email,
			});
			return;
		} else if (isEditConfirmEnabled) {
			dispatch(editUser(user.id, editedValues));
		}
		setUserToEditId(null);
		setEditedValues(defaultEditedValues);
		setIsEditConfirmEnabled(false);
	};

	const onClickDeleteIcon = (userId) => {
		setUserToDeleteId(userId);
		setIsModalOpen(true);
	};

	const onComfirmDeleteUser = (userId) => {
		dispatch(deleteUserById(userId));
		setIsModalOpen(false);
	};

	const fixDate = (date) => {
		return date && date.split('T')[0];
	};

	const onModalCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="user-list-wrapper">
			<table className="table-wrapper">
				<thead className="thead-wrapper">
					<tr className="thead-tr-wrapper">
						<th className="th-wrapper">ID</th>
						<th className="th-wrapper">Name</th>
						<th className="th-wrapper">Role</th>
						<th className="th-wrapper">Phone</th>
						<th className="th-wrapper">Email</th>
						<th className="th-wrapper">Created</th>
						<th className="th-wrapper-action-section">Action</th>
					</tr>
				</thead>
				<tbody className="tbody-wrapper">{renderUsers(allUsersList)}</tbody>
			</table>
			<GeneralModal
				isModalOpen={isModalOpen}
				modalTitle="Delete User"
				modalText="Are you sure you want to delete this user?"
				primaryBtnText="Delete"
				secondaryBtnText="Cancel"
				onClickPrimaryBtn={() => onComfirmDeleteUser(userToDeleteId)}
				onClickSecondaryBtn={onModalCancel}
				shouldCloseOnOverlayClick={true}
			/>
		</div>
	);
};

export default ViewUsers;
