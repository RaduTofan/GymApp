import React, { useMemo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  BrowserRouter,
  Link as RouterLink, LinkProps as RouterLinkProps,
  Route, Switch as RouterSwitch, Router, Redirect
} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Avatar, Button, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import ClientsList from './clients/ClientsList';
import AddClient from './clients/AddClient';
import UpdateClient from './clients/UpdateClient';
import TrainersList from './trainers/TrainersList';
import AddTrainer from './trainers/AddTrainer';
import UpdateTrainer from './trainers/UpdateTrainer';
import WorkoutClassList from './workoutclasses/WorkoutClassesList';
import AddWorkoutClass from './workoutclasses/AddWorkoutClass';
import UpdateWorkoutClass from './workoutclasses/UpdateWorkoutClass';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { light } from '@material-ui/core/styles/createPalette';
import WelcomePage from './welcomepage/WelcomePage';
import { Dashboard } from '@material-ui/icons';
import { addTrainer } from '../api/trainer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import KitchenIcon from '@material-ui/icons/Kitchen';
import NutritionPlansList from './nutritionplans/NutritionPlansList';
import ExercisePlansList from './exerciseplans/ExercisePlansList';
import avatar from '../assets/avatar.png';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Admin = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const token = localStorage.getItem('token');

  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');

    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('token') !== null);
  };

  if (token === null) {
    return <Redirect to="/login" />
  }
  else
    return <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              GymApp
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <Avatar alt="Remy Sharp" src={avatar}  />
            <Button onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
              type="submit"
              variant="contained"
              color="secondary">
              Logout
            </Button>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>

          </div>
          <Divider />
          <List>

            <ListItem button component={RouterLink} to="/admin/home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button component={RouterLink} to="/admin/clients">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Clients" />
            </ListItem>

            <ListItem button component={RouterLink} to="/admin/trainers">
              <ListItemIcon>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Trainers" />
            </ListItem>

            <ListItem button component={RouterLink} to="/admin/workoutclasses">
              <ListItemIcon>
                <SportsKabaddiIcon />
              </ListItemIcon>
              <ListItemText primary="Workout Classes" />
            </ListItem>

          </List>

          <Divider />

          <List>
            <ListItem button component={RouterLink} to="/admin/nutritionplans">
              <ListItemIcon>
                <KitchenIcon />
              </ListItemIcon>
              <ListItemText primary="Nutrition Plans" />
            </ListItem>

            <ListItem button component={RouterLink} to="/admin/exerciseplans">
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Exercise Plans" />
            </ListItem>
          </List>

        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <RouterSwitch>

            <Route exact path='/admin/home' component={WelcomePage}>
            </Route>

            <Route exact path='/admin/clients' component={ClientsList}>
            </Route>

            <Route exact path='/admin/clients/create' component={AddClient}>
            </Route>

            <Route exact path='/admin/clients/update' component={UpdateClient}>
            </Route>

            <Route exact path={`/admin/trainers`}>
              <TrainersList />
            </Route>

            <Route exact path={`/admin/trainers/create`}>
              <AddTrainer />
            </Route>

            <Route exact path={`/admin/trainers/update`}>
              <UpdateTrainer />
            </Route>

            <Route exact path='/admin/workoutclasses' component={WorkoutClassList}>
            </Route>

            <Route exact path='/admin/workoutclasses/create' component={AddWorkoutClass}>
            </Route>

            <Route exact path='/admin/workoutclasses/update' component={UpdateWorkoutClass}>
            </Route>

            <Route exact path='/admin/nutritionplans' component={NutritionPlansList}>
            </Route>


            <Route exact path='/admin/exerciseplans' component={ExercisePlansList}>
            </Route>
            
          </RouterSwitch>

        </main>
      </div>
    </>
};

export default Admin;