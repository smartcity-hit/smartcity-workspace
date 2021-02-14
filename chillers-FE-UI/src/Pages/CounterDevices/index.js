import React, { useEffect } from 'react';
import store from '../../redux/store';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getCounters } from '../../redux/Counters-List/counters-list-actions'

const CounterDevices = () => {
  const counters = useSelector((state) => state.countersList.counters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCounters());
  }, [dispatch]);



  return (
    <div>
      {counters.map(counter => (counter.name))}
    </div>
  );
};

export default CounterDevices;
