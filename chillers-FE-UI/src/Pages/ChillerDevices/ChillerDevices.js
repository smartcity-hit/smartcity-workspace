import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChillers } from '../../redux/Chillers-List/chillers-list-actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

const ChillerDevices = () => {
  const chillers = useSelector((state) => state.chillersList.chillers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChillers());
  }, [dispatch]);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const CustomLink = props => <Link to={`/chiller/${props.chillerId}`} {...props} />;

  return (
    <div className="list-container">
      <h1>Chillers</h1>
      <div className="devices">
        <List>
          {chillers.map(c => (
            <div key={c.host}>
              <ListItemLink button component={CustomLink} chillerId={c.deviceId}>
                <ListItemText primary={c.name} secondary={c.host} />
              </ListItemLink>
              <Divider component="li" />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default ChillerDevices;
