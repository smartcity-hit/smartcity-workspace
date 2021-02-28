import React, { useEffect } from 'react';
import DevicesList from '../../Components/DevicesList/DevicesList';
import { useDispatch, useSelector } from 'react-redux';
import { getCounters } from '../../redux/Counters-List/counters-list-actions';
import { colors, makeStyles } from '@material-ui/core';



const CounterDevices = () => {
  const counters = useSelector((state) => state.countersList.counters);
  const dispatch = useDispatch();


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
    <div>
      <h1>COUNTESRS</h1>
      <DevicesList rows={counters} cols={columns} />
    </div>
  );
};

export default CounterDevices;
