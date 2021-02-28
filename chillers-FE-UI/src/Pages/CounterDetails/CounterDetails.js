import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCounterDetails } from '../../redux/Counter-Details/counter-details-actions';

const CounterDetails = (props) => {
  const counterDetails = useSelector((state) => state.counterDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCounterDetails(1));
  }, [dispatch]);

  return (
    <div>
      {console.log(counterDetails)}
    </div>
  );
}

export default CounterDetails;

