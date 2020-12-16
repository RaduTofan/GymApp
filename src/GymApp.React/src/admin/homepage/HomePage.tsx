import { Button, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
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
    width: "300px",
    padding: "10px"
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
            onClick={() => <Redirect to={'/admin/clients'} />}>
            Clients
          </Button>

          <Button
            variant="contained"
            color="default"
            size="large"
            onClick={() => <Redirect to={'/admin/trainers'} />}>
            Trainers
          </Button>
        </Grid>

      </Grid>

    </div>


  )
}

export default HomePage;