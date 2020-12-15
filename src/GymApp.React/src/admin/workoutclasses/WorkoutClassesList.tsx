import { getAllWorkoutClasses, getWorkoutClassesPaged, removeWorkoutClass } from "../../api/workoutclass/index";
import React, { useEffect, useState } from 'react';
import { CellParams, ColDef, DataGrid, GridApi, PageChangeParams, SortDirection, SortModelParams } from '@material-ui/data-grid';
import { WorkoutClassGridRow } from '../../api/workoutclass/models/WorkoutClassGridRow';
import { PaginatedResult } from '../../lib/grid/PaginatedResult';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import { TrainerGridRow } from "../../api/trainer/models/TrainerGridRow";
import { getClientsPaged } from "../../api/client";
import { getTrainersPaged } from "../../api/trainer";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


const WorkoutClassList = () => {
    const [loading, setLoading] = useState(true);
    const [paginatedWorkoutClasses, setPaginatedWorkoutClasses] = useState<PaginatedResult<WorkoutClassGridRow>>();
    const [page, setPage] = useState(0);
    const [sortColumn, setSortColumn] = useState('scheduledTime');
    const [sortDirection, setSortDirection] = useState('desc');
    const [open, setOpen] = useState(false);
    const [rowToRemove, setRowToRemove] = useState<string | number>();
    const [workoutClassIsRemoved, setWorkoutClassIsRemoved] = useState(false);

    const [workoutClassIdToUpdate, setWorkoutClassIdToUpdate]=useState(0);
    const [searchedTrainer, setSearchedTrainer] = useState("");
    const [searchedClient, setSearchedClient] = useState("");
    const [dateToUpdate, setDateToUpdate]=useState(new Date());
    const [exercisePlanToUpdate, setExercisePlanToUpdate]=useState("");
    


    const history = useHistory();

    const classes = useStyles();

    const handleAlertClickOpen = () => {
        setOpen(true);
    };

    const handleAlertClose = () => {
        setOpen(false);

    };

    const handlePageChange = (params: PageChangeParams) => {
        setPage(params.page - 1);
    };



    const handleSortChange = (params: SortModelParams) => {
        const sortModel = params.sortModel[0];
        if (sortModel) {
            setSortColumn(sortModel.field);
            setSortDirection(`${sortModel.sort}`);
        } else {
            setSortColumn('scheduledTime');
            setSortDirection('desc');
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                let data = await getWorkoutClassesPaged({
                    pageIndex: page,
                    pageSize: 5,
                    columnNameForSorting: sortColumn,
                    sortDirection: sortDirection
                });
                setPaginatedWorkoutClasses(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();

    }, [page, sortColumn, sortDirection, workoutClassIsRemoved]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                let trainerData = await getTrainersPaged({
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
                let clientData = await getClientsPaged({
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

                if(trainerData?.total===1 && clientData.total===1){
                    history.push(
                        {
                        pathname: 'workoutclasses/update',
                        state: { 
                            workoutClass: workoutClassIdToUpdate,
                            trainer: trainerData?.items[0],
                            client: clientData?.items[0],
                            date: dateToUpdate,
                            exercisePlan: exercisePlanToUpdate
                         }
                    });
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [searchedTrainer,searchedClient]);

    const columns: ColDef[] = [
        { field: 'id', headerName: 'Id', hide: true },
        { field: 'trainer', headerName: 'Trainer', width: 200 },
        { field: 'client', headerName: 'Client', width: 200 },
        {
            field: 'scheduledTime',
            headerName: 'Scheduled Time',
            width: 225,
            type: 'dateTime',
            valueFormatter: ({ value }) =>
                (new Date(`${value}`)).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
                }),
        },
        { field: 'exercisePlan', headerName: 'Exercise Plan', width: 200 },
        {
            field: "",
            headerName: "Action",
            disableClickEventBubbling: true,
            width: 250,
            renderCell: (params: CellParams) => {
                const onClickEdit = () => {
                    const clickedRow = params.row;
                    setWorkoutClassIdToUpdate(clickedRow.id as number);
                    setSearchedTrainer(clickedRow.trainer);
                    setSearchedClient(clickedRow.client);
                    setDateToUpdate(clickedRow.scheduledTime);
                    setExercisePlanToUpdate(clickedRow.exercisePlan);
                };


                const handleItemDeletion = () => {
                    handleAlertClickOpen();
                    setRowToRemove(params.row.id);
                    setWorkoutClassIsRemoved(false);
                }

                const deleteItem = () => {
                    if (rowToRemove !== undefined && typeof rowToRemove !== 'string') {
                        removeWorkoutClass(rowToRemove).then(()=>{
                            if (paginatedWorkoutClasses?.pageSize === 1) {
                                paginatedWorkoutClasses.pageIndex = -1;
                            }
                            setWorkoutClassIsRemoved(true);
    
                            handleAlertClose();

                        }); 
                    }

                }



                return <div><Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />} onClick={onClickEdit}>
                    Edit
                        </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />} onClick={handleItemDeletion}>
                        Remove
                        </Button>

                    <div>
                        <Dialog
                            open={open}
                            onClose={handleAlertClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"You are about to remove an item"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to remove this item ?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleAlertClose} color="primary" autoFocus>
                                    No
                              </Button>
                                <Button onClick={deleteItem} color="primary" key={params.row.id}>
                                    Yes
                              </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            }

        }

    ];


    return (
        <div style={{ height: 500, width: '98%', marginTop: 20, padding: "2%" }}>
            <Button 
            className={classes.button}
            component={Link} 
            to="/admin/workoutclasses/create" 
            size="medium" 
            variant="contained" 
            color="primary"
            startIcon={<AddCircleIcon/>}>
                Add workout class
            </Button>
                <DataGrid
                    rows={paginatedWorkoutClasses?.items ?? []}
                    columns={columns}
                    pagination
                    pageSize={paginatedWorkoutClasses?.pageSize ?? 0}
                    rowCount={paginatedWorkoutClasses?.total ?? 0}
                    paginationMode="server"
                    sortingMode="server"
                    onSortModelChange={handleSortChange}
                    onPageChange={handlePageChange}
                    loading={loading}
                />
        </div>
    )


}

export default WorkoutClassList;