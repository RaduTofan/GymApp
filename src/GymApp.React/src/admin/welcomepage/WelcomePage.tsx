import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const WelcomePage = ()=>{
    const useStyles = makeStyles((theme) => ({
        container: {
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
        }
      }));
    const classes = useStyles();
    return(
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
              <h1>main page/dashboard</h1>
          </Grid>
        </Grid>
      </Container>
    )
}

export default WelcomePage;