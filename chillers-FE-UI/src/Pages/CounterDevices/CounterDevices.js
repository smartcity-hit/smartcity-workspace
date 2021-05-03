import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCounters } from '../../redux/Counters-List/counters-list-actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

const CounterDevices = () => {
  const counters = useSelector((state) => state.countersList.counters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCounters());
  }, [dispatch]);

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={`/counter/${linkProps.counterid}`} {...linkProps} />
      )),
    [],
  );

  return (
    <div className="list-container">
      <h1>Counters</h1>
      <div className="devices">
        <Container maxWidth="sm">
          <List>
            {counters.map(c => (
              <div key={c.host}>
                <ListItem button component={CustomLink} counterid={c.deviceId} >
                  <ListItemText primary={c.name} secondary={c.host} />
                </ListItem>
                <Divider component="li" />
              </div>
            ))}
          </List>
        </Container>
      </div>
    </div>
  );
};

export default CounterDevices;
