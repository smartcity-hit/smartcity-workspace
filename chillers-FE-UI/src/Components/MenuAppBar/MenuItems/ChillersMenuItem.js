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


const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ChillersMenuItem(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

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
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Water circuit" />
          </ListItem>
        </List>
      </Collapse>
     </Link>

     
     <Link to="/CoolingCircuit">
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Cooling circuit" />
          </ListItem>
        </List>
      </Collapse>
     </Link>

     
     <Link to="/ChilersHistory">
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
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

