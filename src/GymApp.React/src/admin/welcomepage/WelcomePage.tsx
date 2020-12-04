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

      <h1>main page/dashboard</h1>

    )
}

export default WelcomePage;