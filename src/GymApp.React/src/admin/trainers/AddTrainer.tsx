import { Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import { useHistory } from "react-router-dom";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import { Trainer } from '../../api/trainer/models/Trainer';
import { addTrainer } from '../../api/trainer/index';

const AddTrainer = () => {

    const { control, handleSubmit, errors } = useForm<Trainer>();


    const history = useHistory();



    const minDate = new Date(1950, 1, 1);
    const maxDate = new Date(2005, 1, 1);


    const onSubmit = (form: Trainer) => {
        
        (async () => {
            try {
                console.log(form);
                await addTrainer(form);
                history.push('/admin/trainers');
            } catch (error) {
                console.error(error);
            }
        })()
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}
            style={{ padding: "5%" }}>
                <h1>Add trainer</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="fullName"
                            defaultValue={''}
                            rules={{
                                required: true,
                                minLength: 7
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <TextField
                                    inputRef={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.fullName !== undefined}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="text"
                                    label="Full Name"
                                    autoFocus
                                />
                            )}
                            
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="experience"
                            defaultValue={0}
                            rules={{
                                required: true,
                                min: 0,
                                max: 300
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <TextField
                                    inputRef={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.experience !== undefined}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="number"
                                    label="Experience (months)"
                                    autoFocus
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <Controller
                            control={control}
                            name="dateOfBirth"
                            defaultValue={new Date()}
                            rules={{
                                required: true,
                                min: 0
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <KeyboardDatePicker
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    disableToolbar
                                    inputRef={ref}
                                    variant="inline"
                                    format="yyyy/MM/dd"
                                    margin="normal"
                                    label="Date of birth"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue={''}
                            rules={{
                                required: true,
                                minLength: 5
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <TextField
                                    inputRef={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.email !== undefined}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="email"
                                    label="Email"
                                    autoFocus
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="phone"
                            defaultValue={''}
                            rules={{
                                required: true,
                                minLength: 9,
                                maxLength: 9
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <TextField
                                    inputRef={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.phone !== undefined}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="text"
                                    label="Phone"
                                    autoFocus
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary">
                            Create
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </MuiPickersUtilsProvider>
    );
}

export default AddTrainer;