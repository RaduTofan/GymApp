import { Button, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ParticlesBackground from '../particles/ParticlesBackground';

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: "center",
    justifyContent: 'center',
    alignItems: "center",
    padding: "2%",
    zIndex: 100
  },
  right: {
    position: "absolute",
    right: "0px",
    width: "300px"
  },
  leftbruh:{
    textAlign: "left",
    justifyContent: 'left',
    alignItems: "left",
    paddingLeft: "5%"
  }
}));


const HomePage = () => {
  const classes = useStyles();

  return (
    <div>
      <ParticlesBackground />
      <Grid item xs={12} md={2} lg={9}>
        <h1 className={classes.text}>Welcome to the GymApp</h1>

        <Grid item xs={12} className={classes.right}>
          <Button
            variant="contained"
            color="default"
            size="large"
            component={Link} to={'/admin/clients'}>
            View Clients
          </Button>
        </Grid>

        <Grid item xs={12} className={classes.leftbruh}>
          <Button
            variant="contained"
            color="default"
            size="large"
            component={Link} to='/admin/trainers' >
            View Trainers
          </Button>

        </Grid>
      </Grid>


    </div>


  )
}

export default HomePage;