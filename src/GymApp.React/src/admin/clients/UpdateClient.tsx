import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
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
    const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>([] as NutritionPlan[]);
    const location = useLocation();
    const [nutritionPlanId, setNutritionPlanId] = useState(0);
    

    const state = location.state as CustomState;
    const client = state.client;


    const selectNplans = (e: any) => {
        setNutritionPlanId(e.target.value);
    }


    const history = useHistory();


    useEffect(() => {
        (async () => {
            try {
                const nutPlans = await getAllNutritionPlans();

                for (let element of nutPlans) {
                    if (element.nutritionType === client.nutritionPlan) {
                        setNutritionPlanId(element.id);
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
            <form noValidate onSubmit={handleSubmit(onSubmit)}
             style={{ padding: "5%" }}>
                <h1>Update client</h1>
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
                        {errors.fullName && errors.fullName.type === "required" && (
                            <p style={{ color: "red" }}>This is required</p>
                        )}
                        {errors.fullName && errors.fullName.type === "minLength" && (
                            <p style={{ color: "red" }}>The minimum length is 7 characters</p>
                        )}
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
                        {errors.email && errors.email.type === "required" && (
                            <p style={{ color: "red" }}>This is required</p>
                        )}
                        {errors.email && errors.email.type === "minLength" && (
                            <p style={{ color: "red" }}>The minimum length is 5 characters</p>
                        )}
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
                        {errors.phone && errors.phone.type === "required" && (
                            <p style={{ color: "red" }}>This is required</p>
                        )}
                        {errors.phone && errors.phone.type === "minLength" && (
                            <p style={{ color: "red" }}>The minimum length is 9 characters</p>
                        )}
                        {errors.phone && errors.phone.type === "maxLength" && (
                            <p style={{ color: "red" }}>The maximum length is 9 characters</p>
                        )}
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
                                    label="Height (cm)"
                                    autoFocus
                                />
                            )}
                        />
                        {errors.height && errors.height.type === "required" && (
                            <p style={{ color: "red" }}>This is required</p>
                        )}
                        {errors.height && errors.height.type === "min" && (
                            <p style={{ color: "red" }}>The minimum height is 120cm</p>
                        )}
                        {errors.height && errors.height.type === "max" && (
                            <p style={{ color: "red" }}>The max height is 250cm</p>
                        )}
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
                                    label="Weight (kg)"
                                    autoFocus
                                />
                            )}
                        />
                        {errors.clientWeight && errors.clientWeight.type === "required" && (
                            <p style={{ color: "red" }}>This is required</p>
                        )}
                        {errors.clientWeight && errors.clientWeight.type === "min" && (
                            <p style={{ color: "red" }}>The minimum weight is 40kg</p>
                        )}
                        {errors.clientWeight && errors.clientWeight.type === "max" && (
                            <p style={{ color: "red" }}>The max weight is 350kg</p>
                        )}
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
                            render={({ ref, onBlur }) => (
                                <FormControl
                                style={{minWidth:120}}>
                                    <InputLabel >Nutrition Plan</InputLabel>
                                <Select
                                    inputRef={ref}
                                    value={nutritionPlanId}
                                    onChange={selectNplans}
                                    onBlur={onBlur}
                                >
                                    <MenuItem value={0} disabled>Select nutrition plan</MenuItem>
                                    {
                                        nutritionPlans.map(p => (
                                            <MenuItem key={p.id} value={p.id}>{p.nutritionType}</MenuItem>
                                        ))
                                    }
                                </Select>
                                </FormControl>
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