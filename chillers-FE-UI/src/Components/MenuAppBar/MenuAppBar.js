import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import ChillersMenuItem from "../MenuAppBar/MenuItems/ChillersMenuItem";
import CountersMenuItem from "../MenuAppBar/MenuItems/CountersMenuItem";
import { BroserRouter,Link, Switch, Route } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  temp: {
    justifyContent: "space-between"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    boxShadow: 'unset'
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
}));

const MenuAppBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { pathname } = useLocation();
  const [openMenuAppBar, setOpenMenuAppBar] = React.useState(false);
  const [openCollapsed, setOpenCollapsed] = React.useState(true);

  const handleClick = () => {
    setOpenCollapsed(!openCollapsed);
  };

  const handleDrawerOpen = () => {
    setOpenMenuAppBar(true);
  };

  const handleDrawerClose = () => {
    setOpenMenuAppBar(false);
  };

  const handleMenuClose = () => {
    setOpenCollapsed(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openMenuAppBar
        })}
      >
        <Toolbar className={classes.temp}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openMenuAppBar && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <nav>
            <ul>
              <li><a href="/home">H.I.T Smart City</a></li>
            </ul>
          </nav>
          <ExitToAppOutlinedIcon />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openMenuAppBar}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} className={classes.menuButton}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
                <ChevronRightIcon />
              )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <CountersMenuItem />
          <ChillersMenuItem />
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItem>
        </List>
        <Link to="/locationManagement">
        <List>
          <ListItem button  className={` ${pathname.includes('locationManagement') ? 'active' : ''}`}>
            <ListItemIcon>
                <LocationOnOutlinedIcon />
              </ListItemIcon>
            <ListItemText primary="Location Management" />
          </ListItem>
        </List>
        </Link>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openMenuAppBar
        })}
      >
        <div className={classes.drawerHeader} />

      </main>
    </div>
  );
}

export { MenuAppBar };
