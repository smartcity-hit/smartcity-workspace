import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCounterDetails, getCounterSamples } from '../../redux/Counter-Details/counter-details-actions';
import DetailsCard from '../../Components/DetailsCard/DetailsCard'

const CounterDetails = (props) => {
  const counterSamples = useSelector((state) => state.samples);
  const dispatch = useDispatch();

  const createCol = [
    { state: 'on', location: 'bulding 1', createdDate: '16/02/2021' }
  ];

  useEffect(() => {
    dispatch(getCounterSamples('counter1'));
  }, [dispatch]);

  return (
    <div>
      <DetailsCard cols={createCol} />
      {console.log(counterSamples)}
    </div>
  );
}

export default CounterDetails;

