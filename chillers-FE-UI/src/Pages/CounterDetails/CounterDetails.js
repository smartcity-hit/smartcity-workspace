import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCounterDetails } from '../../redux/Counter-Details/counter-details-actions';

const CounterDetails = (props) => {
  const counterDetails = useSelector((state) => state.counterDetails);
  const dispatch = useDispatch();

  function createData(state, location, createdDate) {
    return { state, location, createdDate };
  }

  const createCol = [
    createData('on', 'bulding 1', '16/02/2021'),
  ];

  useEffect(() => {
    dispatch(getCounterDetails(1));
  }, [dispatch]);

  return (
    <div>
      <DetailsCard cols={createCol} />
      {console.log(counterDetails)}
    </div>
  );
}

export default CounterDetails;

