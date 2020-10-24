import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import CoolingCircuit from '../Pages/CoolingCircuit';
import WaterCircuit from '../Pages/WaterCircuit';
import LoginPage from '../Pages/LoginPage';
import AdminPanel from '../Pages/AdminPanel';
import PrivateRoute from './privateRoute';
import chillerHistory from '../Pages/ChillerHistory';

const Routes = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="full-height">
      <Route
        path="/"
        exact
        render={() =>
          userData ? <Redirect to="/waterCircuit" /> : <Redirect to="/signin" />
        }
      />
      <Route path="/signin" exact component={LoginPage} />
      <PrivateRoute
        path="/waterCircuit"
        exact
        isAuthorized={!!userData}
        component={WaterCircuit}
      />
      <PrivateRoute
        path="/coolingCircuit"
        exact
        isAuthorized={!!userData}
        component={CoolingCircuit}
      />
      <PrivateRoute
        path="/adminPanel"
        exact
        isAuthorized={!!userData && userData.userType === 1}
        component={AdminPanel}
      />
      <PrivateRoute
        path='/chillerHistory'
        exact
        isAuthorized={!!userData}
        component={chillerHistory}
        />
    </div>
  );
};

export default Routes;
