import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signUpUser } from '../../../redux/User-Details/user-details-actions';
import verifiers from '../../../utils/verifiers';

import './index.scss';

const AddUser = () => {
  const [userId, setUserId] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [userType, setUserType] = useState(0);
  const [userTypeError, setUserTypeError] = useState('');
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verifyPasswordError, setVerifyPasswordError] = useState('');
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
      fieldName: 'ID',
      prop: 'id',
      type: 'text',
      value: userId,
      setFunc: setUserId,
      err: userIdError,
      checkFunc: () => setUserIdError(verifiers.checkID(userId)),
    },
    {
      fieldName: 'User Type',
      prop: 'user-type',
      type: 'text',
      value: userType,
      options: [
        { label: 'User', value: 0 },
        { label: 'Admin', value: 1 },
      ],
      setFunc: setUserType,
      err: userTypeError,
    },
    {
      fieldName: 'Full Name',
      prop: 'full-name',
      type: 'text',
      value: fullName,
      setFunc: setFullName,
      err: fullNameError,
      checkFunc: () => setFullNameError(verifiers.checkFullName(fullName)),
    },
    {
      fieldName: 'Address',
      prop: 'address',
      type: 'text',
      value: address,
      setFunc: setAddress,
      err: addressError,
      checkFunc: () => setAddressError(verifiers.checkAddress(address)),
    },
    {
      fieldName: 'Phone',
      prop: 'phone',
      type: 'text',
      placeholder: 'eg. 052-2848332, 0548783929',
      value: phone,
      setFunc: setPhone,
      err: phoneError,
      checkFunc: () => setPhoneError(verifiers.checkPhone(phone)),
    },
    {
      fieldName: 'Email',
      prop: 'email',
      type: 'text',
      value: email,
      setFunc: setEmail,
      err: emailError,
      checkFunc: () => setEmailError(verifiers.checkEmail(email)),
    },
    {
      fieldName: 'Password',
      prop: 'password',
      type: 'password',
      value: password,
      setFunc: setPassword,
      err: passwordError,
      checkFunc: () => setPasswordError(verifiers.checkPassword(password)),
    },
    {
      fieldName: 'Verify Password',
      prop: 'verify-password',
      type: 'password',
      value: verifyPassword,
      setFunc: setVerifyPassword,
      err: verifyPasswordError,
      checkFunc: () => {
        setVerifyPasswordError(
          verifiers.checkVerifyPassword(password, verifyPassword)
        );
      },
    },
  ];

  const resetFields = () => {
    setUserId('');
    setUserType(0);
    setFullName('');
    setAddress('');
    setPhone('');
    setEmail('');
    setPassword('');
    setVerifyPassword('');
  };

  const onClickSubmit = () => {
    if (
      userId === '' ||
      userType === '' ||
      fullName === '' ||
      address === '' ||
      phone === '' ||
      email === '' ||
      password === '' ||
      verifyPassword === ''
    ) {
      setMainError('Please fill all the fields');
    } else {
      setMainError('');
      let phoneWithMinusSign =
        phone[3] !== '-'
          ? phone.substring(0, 3) + '-' + phone.substring(3)
          : phone;
      dispatch(
        signUpUser({
          userId,
          userType,
          fullName,
          address,
          phone: phoneWithMinusSign,
          email,
          password,
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
    <div className="add-user-wrapper">
      <div className="add-user-card">
        <h1 className="add-user-title">Add New User</h1>
        <div className="fields-wrapper">
          <div className="column">
            {renderFields(fields.slice(0, fields.length / 2))}
          </div>
          <div className="column">
            {renderFields(fields.slice(fields.length / 2, fields.length))}
          </div>
        </div>
        <div className="main-error">{mainError}</div>
        <button type="submit" className="add-user-btn" onClick={onClickSubmit}>
          Register
        </button>
      </div>
    </div>
  );
};

export default AddUser;
