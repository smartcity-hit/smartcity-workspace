import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCounterBasicDetails,
  getCounterSamples
} from '../../redux/Counter-Details/counter-details-actions';
import DetailsCard from '../../Components/DetailsCard/DetailsCard'
import HistoryCard from '../../Components/HistoryCard/HistoryCard'
import './CounterDetails.scss';

const CounterDetails = (props) => {
  debugger
  const counterId = parseInt(props.match.params.id);
  const counterDetails = useSelector((state) => state.counterDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCounterBasicDetails(counterId));
    dispatch(getCounterSamples(counterId));
  }, [dispatch]);

  const createCol = [
    {
      counterIP: counterDetails.ip,
      counterLocation: counterDetails.location,
      createdDate: counterDetails.createdDate,
      isAlive: counterDetails.isAlive
    }
  ];

  const columns = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'i1 ',
      label: 'I1',
      minWidth: 100,
      align: 'center',
    },
    {
      id: ' i2',
      label: 'I2',
      minWidth: 100,
      align: 'center',
    },
    {
      id: ' i3',
      label: 'I3',
      minWidth: 100,
      align: 'center',
    },
    {
      id: ' nv1',
      label: 'N/V1',
      minWidth: 100,
      align: 'center',
    },
    {
      id: ' nv2',
      label: 'N/V2',
      minWidth: 100,
      align: 'center',
    },
    {
      id: ' nv3',
      label: 'N/V3',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'v1v2',
      label: 'V1/V2',
      minWidth: 100,
      align: 'center',
    },
    {
      id: ' v1v3',
      label: 'V1/V3',
      minWidth: 100,
      align: 'center',
    },
    {
      id: ' v2v3',
      label: 'V2/V3',
      minWidth: 100,
      align: 'center',
    },
    {
      id: ' cos',
      label: 'CosΦ',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'update',
      label: 'Update At',
      minWidth: 100,
      align: 'center',
    },
  ];

  return (
    <div className="counter-wrapper">
      <h1>{counterDetails.counterName}</h1>
      <div>
        <DetailsCard cols={createCol} />
      </div>
      <div>
        <HistoryCard rows={counterDetails.counterSamples} cols={columns} />
      </div>
    </div>
  );
}

export default CounterDetails;
