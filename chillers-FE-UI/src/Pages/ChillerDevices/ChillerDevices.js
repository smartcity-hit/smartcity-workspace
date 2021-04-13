import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChillers } from '../../redux/Chillers-List/chillers-list-actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const ChillerDevices = () => {
  const chillers = useSelector((state) => state.chillersList.chillers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChillers());
  }, [dispatch]);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <div className="list-container">
      <div className="devices">
        <List>
          {chillers.map(c => (
            <div>
              <ListItemLink key={c._id} button href={`/chiller/${c.name}`}>
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
