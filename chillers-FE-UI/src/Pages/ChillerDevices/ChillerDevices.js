import React, { useEffect } from 'react';
import DevicesList from '../../Components/DevicesList/DevicesList';
import { useDispatch, useSelector } from 'react-redux';
import "./ChillerDevices.scss";
import { getChillers } from '../../redux/Chillers-List/chillers-list-actions';
import chillersListReducer from '../../redux/Chillers-List/chillers-list-reducer';

const ChillerDevices = () => {
  const chillers = useSelector((state) => state.chillersList.chillers);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getChillers());
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
    <div className="body">
      <h1 className="counter-title">CHILLERS</h1>
      <DevicesList rows={chillers} cols={columns} />
    </div>
  );
};

export default ChillerDevices;
