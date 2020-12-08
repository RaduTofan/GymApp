import { Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import { useHistory, useLocation } from "react-router-dom";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { NutritionPlan } from '../../api/nutritionplan/models/NutritionPlan';
import { getAllNutritionPlans } from '../../api/nutritionplan/index';
import { Client } from '../../api/client/models/Client';
import { ClientGridRow } from "../../api/client/models/ClientGridRow";
import { setPageStateUpdate } from "@material-ui/data-grid";
import { updateClient } from "../../api/client/index";

interface CustomState {
    pathname: string,
    client: ClientGridRow
}


const UpdateClient = () => {
    const { control, handleSubmit, errors } = useForm<Client>();
    const [nutritionplans, setNutritionPlans] = useState<NutritionPlan[]>([] as NutritionPlan[]);
    const location = useLocation();
    const [nutritionPlanId, setnutritionPlanId] = useState(0);


    const state = location.state as CustomState;
    const client = state.client;


    const selectNplans = (e: any) => {
        setnutritionPlanId(e.target.value);
    }


    const history = useHistory();


    useEffect(() => {
        (async () => {
            try {
                const nutPlans = await getAllNutritionPlans();

                for (let element of nutPlans) {
                    if (element.nutritionType === client.nutritionPlan) {
                        setnutritionPlanId(element.id);
                        break;
                    }
                }
                setNutritionPlans(nutPlans);

            } catch (error) {
                console.error(error);
            }
        })()
    }, []);

    const onSubmit = (form: Client) => {
        (async () => {
            try {
                form.id=client.id;
                form.nutritionPlanId = nutritionPlanId;
                await updateClient(form);
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
                            defaultValue={client.fullName}
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
                            defaultValue={client.dateOfBirth}
                            rules={{
                                required: true,
                                min: 0
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <KeyboardDatePicker
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
                            defaultValue={client.email}
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
                            defaultValue={client.phone}
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
                            defaultValue={client.height}
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
                                    label="Height"
                                    autoFocus
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="clientWeight"
                            defaultValue={client.clientWeight}
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
                                    label="Weight"
                                    autoFocus
                                />
                            )}
                        />
                    </Grid>



                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="nutritionPlanId"
                            defaultValue={nutritionPlanId}
                            rules={{
                                required: false,
                                min: 0
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <Select
                                    inputRef={ref}
                                    value={nutritionPlanId}
                                    onChange={selectNplans}
                                    onBlur={onBlur}
                                >
                                    <MenuItem value={0} disabled>Select nutrition plan</MenuItem>
                                    {
                                        nutritionplans.map(p => (
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
                            Update
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </MuiPickersUtilsProvider>
    </>;
}

export default UpdateClient;