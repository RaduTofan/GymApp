import { Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import { useHistory, useLocation } from "react-router-dom";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { PaginatedResult } from "../../lib/grid/PaginatedResult";
import { TrainerGridRow } from "../../api/trainer/models/TrainerGridRow";
import { getTrainersPaged } from "../../api/trainer";
import { ClientGridRow } from "../../api/client/models/ClientGridRow";
import { getClientsPaged } from "../../api/client";
import { ExercisePlan } from '../../api/exerciseplan/models/ExercisePlan';
import { getAllExercisePlans } from '../../api/exerciseplan/index';
import { WorkoutClassGridRow } from "../../api/workoutclass/models/WorkoutClassGridRow";
import { WorkoutClass } from "../../api/workoutclass/models/WorkoutClass";
import { updateWorkoutClass } from "../../api/workoutclass";


interface CustomState {
    workoutClass: number,
    trainer: TrainerGridRow,
    client: ClientGridRow,
    date: Date,
    exercisePlan: string

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

const UpdateWorkoutClass = () => {
    const [paginatedTrainers, setPaginatedTrainers] = useState<PaginatedResult<TrainerGridRow>>();
    const [paginatedClients, setPaginatedClients] = useState<PaginatedResult<ClientGridRow>>();
    const [exercisePlans, setExercisePlans] = useState<ExercisePlan[]>([] as ExercisePlan[]);

    const [searchedTrainer, setSearchedTrainer] = useState("");
    const [searchedClient, setSearchedClient] = useState("");
    const [searchedExercisePlan,setSearchedExercisePlan]=useState(0);

    const { control, handleSubmit, errors, setValue } = useForm<WorkoutClass>();

    const textFieldRefTrainer = useRef<HTMLInputElement>();


    const location = useLocation();
    const customState = location.state as CustomState;
    const workoutClassIdToUpdate= customState.workoutClass;
    const trainerFromWorkoutClassToUpdate = customState.trainer;
    const clientFromWorkoutClassToUpdate = customState.client;
    const dateFromWorkoutClassToUpdate = customState.date;
    const exercisePlanFromWorkoutClassToUpdate = customState.exercisePlan;


    const readTextFieldValueTrainer = () => {
        setSearchedTrainer(textFieldRefTrainer.current?.value!);
    }

    const textFieldRefClient = useRef<HTMLInputElement>();
    const readTextFieldValueClient = () => {
        setSearchedClient(textFieldRefClient.current?.value!);
    }
    const classes = useStyles();

    const history = useHistory();

    const selectExPlans = (e: any) => {
        setSearchedExercisePlan(e.target.value);
    }


    useEffect(() => {
        (async () => {
            try {
                let data = await getTrainersPaged({
                    pageIndex: 0,
                    pageSize: 10,
                    columnNameForSorting: "",
                    sortDirection: "",
                    requestFilters: {
                        logicalOperator: 0,
                        filters: [
                            {
                                path: "fullName",
                                value: searchedTrainer
                            }
                        ]
                    }
                });
                if (data.items[0] !== undefined) {
                    setPaginatedTrainers(data);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [searchedTrainer]);


    useEffect(() => {
        (async () => {
            try {
                let data = await getClientsPaged({
                    pageIndex: 0,
                    pageSize: 10,
                    columnNameForSorting: "",
                    sortDirection: "",
                    requestFilters: {
                        logicalOperator: 0,
                        filters: [
                            {
                                path: "fullName",
                                value: searchedClient
                            }
                        ]
                    }
                });
                setPaginatedClients(data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [searchedClient]);

    useEffect(() => {
        (async () => {
            try {
                const exPlans = await getAllExercisePlans();
                setExercisePlans(exPlans);
                console.log(exPlans, exercisePlanFromWorkoutClassToUpdate);
                for (let element of exPlans) {
                    if (element.exercisesType === exercisePlanFromWorkoutClassToUpdate) {
                        console.log("got it", element);
                        setSearchedExercisePlan(element.id);
                        break;
                    }
                }
                setValue("trainerId", trainerFromWorkoutClassToUpdate.id);
                setValue("clientId", clientFromWorkoutClassToUpdate.id);
            } catch (error) {
                console.error(error);
            }
        })()
    }, []);


    const onSubmit = (form: WorkoutClass) => {
        (async () => {
            try {
                form.id=workoutClassIdToUpdate;
                form.exercisePlanId=searchedExercisePlan;
                console.log(form);
                await updateWorkoutClass(form);
                history.push('/admin/workoutclasses');
            } catch (error) {
                console.error(error);
            }
        })()
    };


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="trainerId"
                            rules={{
                                required: true,
                            }}
                            errors={errors}
                            render={({ value, onChange, onBlur }) => (
                                <Autocomplete
                                    id="trainerId"
                                    defaultValue={trainerFromWorkoutClassToUpdate}

                                    options={paginatedTrainers?.items ?? []}
                                    getOptionLabel={(trainer) => trainer.fullName}
                                    style={{ width: 300 }}
                                    onChange={(event, value) => setValue("trainerId", value?.id)}
                                    renderInput={(params) => (<TextField
                                        inputRef={textFieldRefTrainer}
                                        onBlur={onBlur}

                                        onChange={() => {
                                            onChange();
                                            readTextFieldValueTrainer();
                                        }}
                                        {...params}
                                        label="Trainer"
                                        variant="outlined"
                                        value={value?.id ? value.id : ""}
                                        type="text"
                                        error={errors.trainerId !== undefined}
                                    />)}
                                />
                            )}

                        />

                        {errors.trainerId && console.log(errors)}
                    </Grid>



                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="clientId"
                            rules={{
                                required: true
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <Autocomplete
                                    id="combo-box-client"
                                    defaultValue={clientFromWorkoutClassToUpdate}
                                    options={paginatedClients?.items ?? []}
                                    getOptionLabel={(client) => client.fullName}
                                    style={{ width: 300 }}
                                    onChange={(event, value) => setValue("clientId", value?.id)}
                                    renderInput={(params) => (<TextField
                                        inputRef={textFieldRefClient}
                                        onBlur={onBlur}

                                        onChange={() => {
                                            onChange();
                                            readTextFieldValueClient();
                                        }}

                                        {...params}

                                        label="Client"
                                        variant="outlined"
                                        value={value?.id}
                                        type="text"
                                        error={errors.clientId !== undefined}
                                    />)}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <Controller
                            control={control}
                            name="scheduledTime"
                            defaultValue={dateFromWorkoutClassToUpdate}
                            rules={{
                                required: true
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <TextField
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    inputRef={ref}
                                    label="Scheduled time"
                                    type="datetime-local"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{ min: "2020-01-01T10:30", max: "2025-01-01T10:30" }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="exercisePlanId"
                            defaultValue={searchedExercisePlan}
                            rules={{
                                required: true,
                                min: 0
                            }}
                            errors={errors}
                            render={({ ref, onBlur }) => (
                                <Select
                                    inputRef={ref}
                                    value={searchedExercisePlan}
                                    onChange={selectExPlans}
                                    onBlur={onBlur}
                                >
                                    <MenuItem value={0} disabled>Exercise plan</MenuItem>
                                    {
                                        exercisePlans.map(p => (
                                            <MenuItem key={p.id} value={p.id}>{p.exercisesType}</MenuItem>
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
    );

}


export default UpdateWorkoutClass;