import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import KitchenOutlinedIcon from '@material-ui/icons/KitchenOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BroserRouter,Link, Switch, Route } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { signOutUser } from '../../../actions/user';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ChillersMenuItem = () => {

    const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };



  const handleDocumentClick = useCallback((e) => {
      if (open && e.target.id !== 'user-btn-label') {
        setOpen(false);
      }
  }, [open]);

  useEffect(() => {
      document.body.addEventListener('click', handleDocumentClick);
      return (() => {
          document.body.removeEventListener('click', handleDocumentClick);
      });
  }, [handleDocumentClick])

  const toggleUserDropdown = () => {
    setOpen(!open);
  }

  const onClickSignOut = () => {
      dispatch(signOutUser());
  }

  return (
    <div>
      
      <ListItem button key="Chillers" onClick={handleClick}>
        <ListItemIcon>
          <KitchenOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Chillers" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Link to="/waterCircuit">
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={`nav-link ${pathname.includes('waterCircuit') ? 'active' : ''}`}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Water circuit" />
          </ListItem>
        </List>
      </Collapse>
     </Link>

     
     <Link to="/coolingCircuit">
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={`nav-link ${pathname.includes('coolingCircuit') ? 'active' : ''}`}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Cooling circuit" />
          </ListItem>
        </List>
      </Collapse>
     </Link>

     
     <Link to="/chillerHistory">
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={`nav-link last ${pathname.includes('chillerHistory') ? 'active' : ''}`}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Chillers history" />
          </ListItem>
        </List>
      </Collapse>
     </Link>
    </div>
  )
};

export default ChillersMenuItem;
