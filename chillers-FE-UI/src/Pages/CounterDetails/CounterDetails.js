import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCounterBasicDetails, getCounterSamples } from '../../redux/Counter-Details/counter-details-actions';
import DetailsCard from '../../Components/DetailsCard/DetailsCard'
import './CounterDetails.scss';

const CounterDetails = (props) => {
  const samples = useSelector((state) => state.counterDetails.counterSamples);
  const location = useSelector((state) => state.counterDetails.counterLocation);
  const name = useSelector((state) => state.counterDetails.counterName);
  const createdDate = useSelector((state) => state.counterDetails.createdDate);
  const ip = useSelector((state) => state.counterDetails.counterIP);
  console.log(props.location.counterName)
  const dispatch = useDispatch();

  const createCol = [
    { counterName: name, counterIP: ip, counterLocation: location, createdDate: createdDate }
  ];

  useEffect(() => {
    dispatch(getCounterSamples(props.location.counterName)),
      dispatch(getCounterBasicDetails(props.location.counterName));
  }, [dispatch]);

  return (

    <div className="counter-wrapper">
      <div>
      <DetailsCard cols={createCol} />
      {samples.map((sample) => {
        return <label>{JSON.stringify(sample)}</label>
      })}
      </div>
    </div>
  );
}

export default CounterDetails;
