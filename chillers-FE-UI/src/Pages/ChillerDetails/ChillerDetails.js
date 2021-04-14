import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getChillerSamples,
    getChillerBasicDetails
} from '../../redux/Chiller-Details/chiller-details-actions';

const ChillerDetails = (props) => {
    const chillerId = parseInt(props.match.params.id);
    const chillerDetails = useSelector((state) => state.chillerDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChillerBasicDetails(chillerId));
        dispatch(getChillerSamples(chillerId));
    }, [dispatch]);

    return (
        <div>
            <h1>{chillerDetails.chillerName}</h1>
        </div>
    );
}

export default ChillerDetails;