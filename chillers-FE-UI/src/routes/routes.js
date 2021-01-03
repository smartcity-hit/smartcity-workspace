import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import CoolingCircuit from '../Pages/CoolingCircuit';
import WaterCircuit from '../Pages/WaterCircuit';
import LoginPage from '../Pages/LoginPage';
import AdminPanel from '../Pages/AdminPanel';
import PrivateRoute from './privateRoute';
import chillerHistory from '../Pages/ChillerHistory';
import Alerts from '../Pages/Alerts';
import { MenuAppBar } from "../Components/MenuAppBar/MenuAppBar";

const Routes = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="full-height">
      <Route
        path="/"
        exact
        render={() =>
          userData ? <Redirect to="/MenuAppBar" /> : <Redirect to="/signin" />
        }
      />


      <Route path="/signin" exact component={LoginPage} />
      <PrivateRoute
        path="/MenuAppBar"
        exact
        isAuthorized={!!userData}
        component={MenuAppBar}
      />
      <PrivateRoute
        path="/CountersAlerts"
        exact
        isAuthorized={!!userData}
        component={Alerts}
      />
      <PrivateRoute
        path="/CountersDevices"
        exact
        isAuthorized={!!userData}
        component={Devices}
      />

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
