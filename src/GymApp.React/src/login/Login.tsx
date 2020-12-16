import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Controller, useForm } from 'react-hook-form';
import { UserForLogin, login } from '../api/account/login';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(3, 0),
    },
}));

export default function Login() {

    const classes = useStyles();
    const { control, handleSubmit, errors } = useForm<UserForLogin>();

    const history = useHistory();

    const onSubmit = (data: UserForLogin) => {
        login(data);

    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="username"
                        defaultValue={''}
                        rules={{
                            required: true,
                        }}
                        errors={errors}
                        render={({ ref, value, onChange, onBlur }) => (
                            <TextField
                                inputRef={ref}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={errors.username !== undefined}
                                helperText={errors.username && 'Please provide a valid username'}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                label="Username"
                                autoFocus
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        defaultValue={''}
                        rules={{
                            required: true
                        }}
                        errors={errors}
                        render={({ ref, value, onChange, onBlur }) => (
                            <TextField
                                inputRef={ref}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                error={errors.password !== undefined}
                                helperText={
                                    errors.password && 'Please provide a valid password'
                                }
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Log In
                    </Button>
                </form>
            </div>
        </Container>
    );
}