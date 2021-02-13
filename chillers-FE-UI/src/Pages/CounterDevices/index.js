import React from 'react';
import store from '../../store';
import { useDispatch, useSelector } from 'react-redux';

const CounterDevices = () => {
  const { counters } = useSelector((state) => state.counters);
  return (
    <div>
      {counters.map(counter => (counter.name))}
    </div>
  );
};

export default CounterDevices;
