import React, { useEffect,useState } from 'react';
import DevicesList from '../../Components/DevicesList/DevicesList';
import { useDispatch, useSelector } from 'react-redux';
import { getCounters } from '../../redux/Counters-List/counters-list-actions';
import AddDevice from '../../Components/AddDevice/AddDevice';
import "./CounterDevices.scss"; 

const CounterDevices = () => {
  const counters = useSelector((state) => state.countersList.counters);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);


	const onClickTab = (tabClicked) => {
		setActiveTab(tabClicked);
	  }

  useEffect(() => {
    dispatch(getCounters());
  }, [dispatch]);

  const columns = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'ip',
      label: 'Ip',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'createdDate',
      label: 'Created Date',
      minWidth: 100,
      align: 'center',
    },
    
  ];

  return (
    <div className="admin-panel-wrapper">
    <div className="admin-panel-container">
      <h1 className='admin-panel-title'>COUNTERS</h1>
        <div className='tabs'>
          <div className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => { onClickTab(0) }}>
            <label className="tab-name">View Counters</label>
          </div>
          <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => { onClickTab(1) }}>
            <label className="tab-name">Add Counter</label>
          </div>
        </div>
         </div>
      <div className='active-tab'>
      {activeTab === 0 ? <DevicesList rows={counters} cols={columns} /> : activeTab === 1 ? <AddDevice unitId={1} deviceTypeId={2}/> : ''}
      </div>
    </div>
  );
};

export default CounterDevices;
