import { Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import { useHistory } from "react-router-dom";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { WorkoutClass } from '../../api/workoutclass/models/WorkoutClass';
import { addWorkoutClass } from '../../api/workoutclass/index';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { PaginatedResult } from "../../lib/grid/PaginatedResult";
import { TrainerGridRow } from "../../api/trainer/models/TrainerGridRow";
import { getTrainersPaged } from "../../api/trainer";

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

const AddWorkoutClass = () => {
    const [paginatedTrainers, setPaginatedTrainers] = useState<PaginatedResult<TrainerGridRow>>();
    const [searchedTrainer, setSearchedTrainer] = useState("");
    const { control, handleSubmit, errors } = useForm<WorkoutClass>();

    const textFieldRef = useRef<HTMLInputElement>();
    const readTextFieldValue = () => {
        setSearchedTrainer(textFieldRef.current?.value!);
    }

    const classes = useStyles();
    const history = useHistory();




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
                setPaginatedTrainers(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        })();

    }, [searchedTrainer]);


    const onSubmit = (form: WorkoutClass) => {

        (async () => {
            try {
                console.log(form);
                //await addWorkoutClass(form);
                //history.push('/admin/workoutclasses');
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
                            defaultValue={''}
                            rules={{
                                required: true
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <Autocomplete
                                    id="combo-box-trainer"
                                    options={paginatedTrainers?.items ?? []}
                                    getOptionLabel={(trainer) => trainer.fullName}
                                    style={{ width: 300 }}
                                    renderInput={(params) => (<TextField
                                        inputRef={textFieldRef}
                                        onBlur={onBlur}
                                        onChange={()=>{
                                            onChange(); 
                                            readTextFieldValue()}}
                                        {...params}
                                        label="Trainer"
                                        variant="outlined"
                                        value={value}
                                        //error={errors.trainerId !== undefined}
                                         />)}

                                />
                                // <TextField
                                //     inputRef={ref}
                                //     onChange={onChange}
                                //     onBlur={onBlur}
                                //     value={value}
                                //     error={errors.trainerId !== undefined}
                                //     variant="outlined"
                                //     margin="normal"
                                //     required
                                //     type="number"
                                //     label="Trainer Id"
                                //     autoFocus
                                // />
                            )}

                        />
                    </Grid>



                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="clientId"
                            defaultValue={""}
                            rules={{
                                required: true,
                                min: 0
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <TextField
                                    inputRef={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.clientId !== undefined}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="number"
                                    label="Client Id"
                                    autoFocus
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <Controller
                            control={control}
                            name="scheduledTime"
                            defaultValue="2021-12-01T10:30"
                            rules={{
                                required: true,
                                min: 0
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
                                    defaultValue="2021-12-01T10:30"
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
                            defaultValue={''}
                            rules={{
                                required: true,
                                min: 0
                            }}
                            errors={errors}
                            render={({ ref, value, onChange, onBlur }) => (
                                <TextField
                                    inputRef={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.exercisePlanId !== undefined}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="number"
                                    label="Exercise plan Id"
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

export default AddWorkoutClass;