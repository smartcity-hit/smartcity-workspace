import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {addCounter} from '../../redux/Counter-Details/counter-details-actions';


import './AddDevice.scss';

const AddDevice = ({unitId, deviceTypeId}) => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [mainError, setMainError] = useState('');

  const history = useHistory();
  const { userData, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      history.push('/');
    }
  }, [userData, history]);

  useEffect(() => {
    console.log(loading);
    if (!loading && !error) {
      resetFields();
    }
  }, [loading, error]);

  const fields = [

    {
      fieldName: 'Host',
      prop: 'host',
      type: 'text',
      value: host,
      setFunc: setHost,
    },
    {
      fieldName: 'Port',
      prop: 'port',
      type: 'text',
      value: port,
      setFunc: setPort,
    },
  
  ];

  const resetFields = () => {
    setHost('');
    setPort('');
   
  };

  const onClickSubmit = () => {
    if (
      host === '' ||
      port === '' 
    
    ) {
      setMainError('Please fill all the fields');
    } else {
      setMainError('');
      dispatch(
        addCounter({
            host,
            port,
            unitId,
            deviceTypeId,
        })
      );
    }
  };

  const renderFields = (fields) => {
    return fields.map((field, index) => {
      return (
        <div className="field-wrapper" key={index}>
          <div className="row">
            <label htmlFor={field.prop} className="field-label">
              {field.fieldName}
            </label>
            {!field.options ? (
              <input
                type={field.type}
                name={field.prop}
                id={field.prop}
                placeholder={field.placeholder}
                value={field.value}
                className="field-input"
                onChange={(e) => field.setFunc(e.target.value)}
                onBlur={field.checkFunc}
              ></input>
            ) : (
                <select
                  name={field.prop}
                  id={field.prop}
                  className="field-select"
                  value={field.value}
                  onChange={(e) => {
                    console.log(field.value);
                    field.setFunc(e.target.value);
                  }}
                >
                  {field.options.map((option, index) => (
                    <option
                      value={option.value}
                      key={index}
                      className="field-option"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
          </div>
          <div className="field-error">{field.err}</div>
        </div>
      );
    });
  };

  return (
    <div className="add-counter-wrapper">
      <div className="add-counter-card">
        <h1 className="add-counter-title">Add New {deviceTypeId === 1 ? 'Chiller' : 'Counter'}</h1>
        <div className="fields-wrapper">
          <div className="column">
            {renderFields(fields.slice(0, fields.length / 2))}
          </div>
          <div className="column">
            {renderFields(fields.slice(fields.length / 2, fields.length))}
          </div>
        </div>
        <div className="main-error">{mainError}</div>
        <button type="submit" className="add-counter-btn" onClick={onClickSubmit}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddDevice;
