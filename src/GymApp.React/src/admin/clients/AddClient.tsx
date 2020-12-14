import { Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import { useHistory } from "react-router-dom";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import { NutritionPlan } from '../../api/nutritionplan/models/NutritionPlan';
import { getAllNutritionPlans } from '../../api/nutritionplan/index';
import { Client } from '../../api/client/models/Client';
import { addClient } from '../../api/client/index';


const AddClient = () => {
    const { control, handleSubmit, errors } = useForm<Client>();
    const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>([] as NutritionPlan[]);


    const minDate = new Date(1950, 1, 1);
    const maxDate = new Date(2005, 1, 1);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                const nutPlans = await getAllNutritionPlans();
                setNutritionPlans(nutPlans);
            } catch (error) {
                console.error(error);
            }
        })()
    }, []);

    const onSubmit = (form: Client) => {
        (async () => {
            try {
                await addClient(form);
                history.push('/admin/clients');
            } catch (error) {
                console.error(error);
            }
        })()
    };

    return <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                        <Controller
                            control={control}
                            name="height"
                            defaultValue={0}
                            rules={{
                                required: true,
                                min: 120,
                                max: 250
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <TextField
                                    inputRef={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.height !== undefined}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="number"
                                    label="Height (cm)"
                                    autoFocus
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="clientWeight"
                            defaultValue={0}
                            rules={{
                                required: true,
                                min: 40,
                                max: 350
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <TextField
                                    inputRef={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.clientWeight !== undefined}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="number"
                                    label="Weight (kg)"
                                    autoFocus
                                />
                            )}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="nutritionPlanId"
                            defaultValue={''}
                            rules={{
                                required: false,
                                min: 0
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <Select
                                    inputRef={ref}
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                >
                                    <MenuItem value={-1} disabled>Nutrition plan</MenuItem>
                                    {
                                        nutritionPlans.map(p => (
                                            <MenuItem key={p.id} value={p.id}>{p.nutritionType}</MenuItem>
                                        ))
                                    }
                                </Select>
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
    </>;
}

export default AddClient;