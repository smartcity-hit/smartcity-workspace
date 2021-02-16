import React, { useState } from 'react';
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
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function CountersMenuItem(props) {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const onClickTab = (tabClicked) => {
    setActiveTab(tabClicked);
  }
  return (
    <div>
      <ListItem button key="Counters" onClick={handleClick}>
        <ListItemIcon>
          <KitchenOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Counters" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>


      <Link to="/CountersAlerts">
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List className="menu-app-bar" component="div" disablePadding>
            <ListItem button className={`nav-link ${pathname.includes('CountersAlerts') && activeTab === 0 ? 'active' : ''}`} onClick={() => { onClickTab(0) }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Alerts" />
            </ListItem>
          </List>
        </Collapse>
      </Link>
      <Link to="/CounterDevices">
      <Collapse in={open} timeout="auto" unmountOnExit>

        <List className="menu-app-bar" component="div" disablePadding>
          <ListItem button className={`nav-link ${pathname.includes('CountersDevices') && activeTab === 1 ? 'active' : ''}`} onClick={() => { onClickTab(1) }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Devices" />
          </ListItem>
        </List>
      </Collapse>
      </Link>
    </div>
  )
};

export { CountersMenuItem };