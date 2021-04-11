import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCounterBasicDetails, getCounterSamples } from '../../redux/Counter-Details/counter-details-actions';
import DetailsCard from '../../Components/DetailsCard/DetailsCard'
import HistoryCard from '../../Components/HistoryCard/HistoryCard'
import './CounterDetails.scss';

const CounterDetails = (props) => {
  const samples = useSelector((state) => state.counterDetails.counterSamples);
  const location = useSelector((state) => state.counterDetails.counterLocation);
  const name = useSelector((state) => state.counterDetails.counterName);
  const createdDate = useSelector((state) => state.counterDetails.createdDate);
  const ip = useSelector((state) => state.counterDetails.counterIP);
  const isAlive = useSelector((state) => state.counterDetails.isAlive);
  const dispatch = useDispatch();

  const createCol = [
    {
      counterName: name,
      counterIP: ip,
      counterLocation: location,
      createdDate: createdDate,
      isAlive: isAlive
    }
  ];

  useEffect(() => {
    dispatch(getCounterSamples(props.location.counterName)),
      dispatch(getCounterBasicDetails(props.location.counterName));
  }, [dispatch]);

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
      <div>
        <DetailsCard cols={createCol} />
      </div>
      <p></p>
      <div>
        <HistoryCard rows={samples} cols={columns} />
      </div>
    </div>
  );
}

export default CounterDetails;
