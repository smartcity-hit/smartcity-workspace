import React from 'react';
import HistoryCard from '../../Components/HistoryCard/HistoryCard'

const CounterDetails = () => {

  function createData(name, date, i1,i2,i3,nv1,nv2,nv3,v1v2,v1v3,v2v3,cos) {

    return { name, date, i1, i2,i3,nv1,nv2,nv3,v1v2,v1v3,v2v3,cos };
  }

  const rows_data = [
    createData('counter1', '16/02/2021','110', '100','100','100','100','100','100','100','100','100'),
  ];

  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'date', label: 'Sample Date', minWidth: 100 },
    { id: 'I1', label: 'I1', minWidth: 50, textAlign:'center'},
    { id: 'I2',label: 'I2',minWidth: 50,},
    { id: 'I3',label: 'I3',minWidth: 50,},
    { id: 'NV1',label: 'N/V1',minWidth: 50,},
    { id: 'NV2',label: 'N/V2',minWidth: 50,},
    { id: 'NV3',label: 'N/V3',minWidth: 50,},
    { id: 'V1V2',label: 'V1/V2',minWidth: 50,},
    { id: 'V1V3',label: 'V1/V3',minWidth: 50,},
    { id: 'V2V3',label: 'V2/V3',minWidth: 50,},
    { id: 'cos',label: 'cosΦ',minWidth: 50,},
  ];

  return(
    
  <div>
    <h3 textAlign='left'>Counter History</h3>
    <HistoryCard rows={rows_data} cols={columns}/>
  </div>
  );
  };

export default CounterDetails;

