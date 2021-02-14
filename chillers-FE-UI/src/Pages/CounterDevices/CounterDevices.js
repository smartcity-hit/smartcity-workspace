import React from 'react';
import ReactDOM from 'react-dom';
import DevicesList from '../../Components/DevicesList/DevicesList';


const CounterDevices=()=>{
    return(
    <div>
    <DevicesList rows={'counter1','172.16.11.302','12/01/21'}/>
    </div>
    );
};

export default CounterDevices;
