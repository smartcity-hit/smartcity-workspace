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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

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
          <List component="div" disablePadding>
            <ListItem button className={`nav-link ${pathname.includes('CountersAlerts') ? 'active' : ''}`}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Alerts" />
            </ListItem>
          </List>
        </Collapse>
      </Link>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={`nav-link ${pathname.includes('CountersDevices') ? 'active' : ''}`}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Devices" />
          </ListItem>
        </List>
      </Collapse>

    </div>
  )
};

export { CountersMenuItem };