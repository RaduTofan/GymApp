import { useGetAllTrainers, getTrainersPaged, removeTrainer, updateTrainer } from "../../api/trainer/index";
import { PaginatedResult } from '../../lib/grid/PaginatedResult';
import React, { useEffect, useState } from 'react';
import { CellParams, ColDef, DataGrid, PageChangeParams, SortDirection, SortModelParams } from '@material-ui/data-grid';
import { TrainerGridRow } from "../../api/trainer/models/TrainerGridRow";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';



const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const TrainersList = () => {
    const [loading, setLoading] = useState(true);
    const [paginatedTrainers, setPaginatedTrainers] = useState<PaginatedResult<TrainerGridRow>>();
    const [page, setPage] = useState(0);
    const [sortColumn, setSortColumn] = useState('experience');
    const [sortDirection, setSortDirection] = useState('asc');
    const [open, setOpen] = useState(false);
    const [rowToRemove, setRowToRemove] = useState<string | number>();
    const [trainerIsRemoved, setTrainerIsRemoved] = useState(false);



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
            setSortColumn('experience');
            setSortDirection('asc');
        }
    }

    const sortModel = [
        {
            field: sortColumn,
            sort: sortDirection as SortDirection,
        },
    ];

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                let data = await getTrainersPaged({
                    pageIndex: page,
                    pageSize: 5,
                    columnNameForSorting: sortColumn,
                    sortDirection: sortDirection
                });
                setPaginatedTrainers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();

    }, [page, sortColumn, sortDirection, trainerIsRemoved]);

    const columns: ColDef[] = [
        { field: 'id', headerName: 'Id', hide: true },
        { field: 'fullName', headerName: 'Full Name', width: 250 },
        { field: 'experience', headerName: 'Exp. (months)', width: 125 },
        {
            field: 'dateOfBirth',
            headerName: 'Date of Birth',
            width: 200,
            type: 'dateTime',
            valueFormatter: ({ value }) =>
                (new Date(`${value}`)).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                }),
        },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone nr. ', width: 125 },
        {
            field: "",
            headerName: "Action",
            disableClickEventBubbling: true,
            width: 250,
            renderCell: (params: CellParams) => {
                const onClickEdit = () => {
                    const clickedRow = params.row;
                    history.push({
                        pathname: 'trainers/update',
                        state: { trainer: clickedRow }
                    });
                };


                const handleItemDeletion = () => {
                    handleAlertClickOpen();
                    setRowToRemove(params.row.id);

                }

                const deleteItem = () => {
                    if (rowToRemove !== undefined && typeof rowToRemove !== 'string') {
                        removeTrainer(rowToRemove); //TODO index.ts

                        if (paginatedTrainers?.pageSize == 1) {
                            paginatedTrainers.pageIndex = -1;
                        }
                        setTrainerIsRemoved(true);

                        handleAlertClose();
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
            component={Link} 
            to="/admin/trainers/create" 
            size="medium" 
            variant="contained" 
            color="primary"
            startIcon={<AddCircleIcon/>}>
                Add trainer
            </Button>
            <DataGrid
                rows={paginatedTrainers?.items ?? []}
                columns={columns}
                pagination
                pageSize={paginatedTrainers?.pageSize ?? 0}
                rowCount={paginatedTrainers?.total ?? 0}
                paginationMode="server"
                sortingMode="server"
                onSortModelChange={handleSortChange}
                onPageChange={handlePageChange}
                loading={loading}
                sortModel={sortModel}
            />
        </div>
    )


}

export default TrainersList