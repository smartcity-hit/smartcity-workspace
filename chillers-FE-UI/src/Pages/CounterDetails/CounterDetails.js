import React from 'react';
import DetailsCard from '../../Components/DetailsCard/DetailsCard'

const CounterDetails = () => {
  function createData(state, location, createdDate) {
    return { state, location, createdDate };
  }

  const createCol=[
    createData('on','bulding 1','16/02/2021'),
  ];
return(
  <div>
    <DetailsCard cols={createCol}/>
  </div>
);
};

export default CounterDetails;

