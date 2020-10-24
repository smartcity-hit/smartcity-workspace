import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../actions/user';
import AddUser from './AddUser';
import ViewUsers from './ViewUsers'
import './index.scss';

const AdminPanel = () => {
  
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onClickTab = (tabClicked) => {
    if (tabClicked === 0) {
      dispatch(getAllUsers());
    }
    setActiveTab(tabClicked);
  }

  return (
    <div className="admin-panel-wrapper">
      <div className="admin-panel-container">
        <h1 className = 'admin-panel-title'>Admin Panel</h1>
        <div className='tabs'>
          <div className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => { onClickTab(0) }}>
            <label className="tab-name">View Users</label>
          </div>
          <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => { onClickTab(1) }}>
            <label className="tab-name">Add User</label>
          </div>
        </div>
      </div>
      {activeTab === 0 ? <ViewUsers /> : activeTab === 1 ? <AddUser /> : ''}
    </div>
  )
};

export default AdminPanel;