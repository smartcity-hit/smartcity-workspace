import React from "react";
import '../MenuAppBar.scss';
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
import { BroserRouter, Link, Switch, Route } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { signOutUser } from '../../../actions/user';
import MenuAppBar from "../MenuAppBar";
import handleDrawerClose from "../MenuAppBar";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ChillersMenuItem = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const onClickTab = (tabClicked) => {
    setActiveTab(tabClicked);
  }

  const handleDocumentClick = useCallback((e) => {
    if (open && e.target.id !== 'user-btn-label') {
    }
  }, [open]);

  useEffect(() => {
    document.body.addEventListener('click', handleDocumentClick);
    return (() => {
      document.body.removeEventListener('click', handleDocumentClick);
    });
  }, [handleDocumentClick])

  const onClickSignOut = () => {
    dispatch(signOutUser());
  }

  const handelClose = () => {
    setOpen(false);
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

      <Link to="/chillers/water-circuit">
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List className="menu-app-bar" component="div" disablePadding>
            <ListItem button className={`nav-link ${pathname.includes('WaterCircuit') && activeTab === 0 ? 'active' : ''}`} onClick={() => { onClickTab(0) }}>
              <ListItemIcon onClick={handleDocumentClick}>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Water circuit" />
            </ListItem>
          </List>
        </Collapse>
      </Link>


      <Link to="/chillers/cooling-circuit">
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List className="menu-app-bar" component="div" disablePadding>
            <ListItem button className={`nav-link ${pathname.includes('CoolingCircuit') && activeTab === 1 ? 'active' : ''}`} onClick={() => { onClickTab(1) }}>
              <ListItemIcon onClick={handelClose}>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Cooling circuit" />
            </ListItem>
          </List>
        </Collapse>
      </Link>


      <Link to="/chillers/chiller-history">
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List className="menu-app-bar" component="div" disablePadding>
            <ListItem button className={`nav-link ${pathname.includes('ChillerHistory') && activeTab === 2 ? 'active' : ''}`} onClick={() => { onClickTab(2) }}>
              <ListItemIcon onClick={handelClose}>
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
