import React from 'react';
import ReactDOM from 'react-dom';
import DevicesList from '../../Components/DevicesList/DevicesList';
import useState from 'react';
import createData from '../../Components/DevicesList/DevicesList'

const CounterDevices=()=>{
  
    function createData(name, ip, createdDate) {
        return { name, ip, createdDate };
      }
      
      const ROW_DATA = [
          createData(
              'counter1',
              '172.16.11.203',
              '12/01/2021'
          ),
          createData(
              'counter2',
              '172.16.11.204',
              '12/01/2021'
          ),
      ];

      const columns = [
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'ip', label: 'Ip', minWidth: 100 },
        {
          id: 'createdDate',
          label: 'Created Date',
          minWidth: 100,
          align: 'right',
        },
       
      ];
    
    return(
    <div>
    <DevicesList rows={ROW_DATA} cols={columns} />
    </div>
    );
};

export default CounterDevices;
