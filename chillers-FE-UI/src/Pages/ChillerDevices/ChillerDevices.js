import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChillers } from '../../redux/Chillers-List/chillers-list-actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

const ChillerDevices = () => {
  const chillers = useSelector((state) => state.chillersList.chillers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChillers());
  }, [dispatch]);

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={`/chiller/${linkProps.chillerid}`} {...linkProps} />
      )),
    [],
  );

  return (
    <div className="list-container">
      <h1>Chillers</h1>
      <div className="devices">
        <Container maxWidth="sm">
          <List>
            {chillers.map(c => (
              <div key={c.host}>
                <ListItem button component={CustomLink} chillerid={c.deviceId} >
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

export default ChillerDevices;
