import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChillerBasicDetails } from '../../redux/Chiller-Details/chiller-details-actions';
import DetailsCard from '../../Components/DetailsCard/DetailsCard';

const ChillerDetails = (props) => {
    const chillerDetails = useSelector((state) => state.chillerDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        debugger
        dispatch(getChillerBasicDetails('chiller1'));
    }, [dispatch]);

    return (
        <div>{console.log('moria')}</div>
    );
}

export default ChillerDetails;