import { getAllTrainers, getTrainersPaged, removeTrainer, updateTrainer } from "../../api/trainer/index";
import { PaginatedResult } from '../../lib/grid/PaginatedResult';
import React, { useEffect, useRef, useState } from 'react';
import { CellParams, ColDef, DataGrid, PageChangeParams, SortDirection, SortModelParams } from '@material-ui/data-grid';
import { TrainerGridRow } from "../../api/trainer/models/TrainerGridRow";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import BackspaceIcon from '@material-ui/icons/Backspace';


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
    const [fullNameFilter, setFullNameFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [phoneFilter, setPhoneFilter] = useState("");
    const [operatorFilter, setOperatorFilter] = useState(0);


    const fullNameFilterRef = useRef<HTMLInputElement>();
    const readTextFieldValueFullName = () => {
        setFullNameFilter(fullNameFilterRef.current?.value!);
    }

    const emailFilterRef = useRef<HTMLInputElement>();
    const readTextFieldValueEmail = () => {
        setEmailFilter(emailFilterRef.current?.value!);
    }

    const phoneFilterRef = useRef<HTMLInputElement>();
    const readTextFieldValuePhone = () => {
        setPhoneFilter(phoneFilterRef.current?.value!);
    }

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


    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                let data = await getTrainersPaged({
                    pageIndex: page,
                    pageSize: 5,
                    columnNameForSorting: sortColumn,
                    sortDirection: sortDirection,
                    requestFilters: {
                        logicalOperator: operatorFilter,
                        filters: [
                            {
                                path: "fullName",
                                value: fullNameFilter
                            },
                            {
                                path: "email",
                                value: emailFilter
                            },
                            {
                                path: "phone",
                                value: phoneFilter
                            }
                        ]
                    }
                });
                setPaginatedTrainers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();

    }, [page, sortColumn, sortDirection, trainerIsRemoved,
        fullNameFilter, emailFilter, phoneFilter, operatorFilter]);

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
                    setTrainerIsRemoved(false);

                }

                const deleteItem = () => {
                    if (rowToRemove !== undefined && typeof rowToRemove !== 'string') {
                        removeTrainer(rowToRemove).then(() => {
                            if (paginatedTrainers?.pageSize == 1) {
                                paginatedTrainers.pageIndex = -1;
                            }
                            setTrainerIsRemoved(true);

                            handleAlertClose();
                            console.log("after removed", trainerIsRemoved);
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
        <div style={{ padding: "2%" }}>
            <div><h3>Filters</h3></div>
            <div>
                <TextField
                    className={classes.button}
                    variant="outlined"
                    margin="normal"
                    type="text"
                    label="Full Name"
                    value={fullNameFilter}
                    onChange={(event) => {
                        setFullNameFilter(event.target.value);
                        readTextFieldValueFullName();
                    }}
                    inputRef={fullNameFilterRef}
                />
                <TextField
                    className={classes.button}
                    variant="outlined"
                    margin="normal"
                    type="text"
                    label="Email"
                    value={emailFilter}
                    onChange={(event) => {
                        setEmailFilter(event.target.value);
                        readTextFieldValueEmail();
                    }}
                    inputRef={emailFilterRef}
                />
                <TextField
                    className={classes.button}
                    variant="outlined"
                    margin="normal"
                    type="number"
                    label="Phone"
                    value={phoneFilter}
                    onChange={(event) => {
                        setPhoneFilter(event.target.value);
                        readTextFieldValuePhone();
                    }}
                    inputRef={phoneFilterRef}
                />

                <FormControl
                    style={{ minWidth: 120 }}>
                    <InputLabel >Logical operator</InputLabel>
                    <Select
                        value={operatorFilter}
                        onChange={(event: any) => {
                            setOperatorFilter(event.target.value);
                        }}
                        label="operator">
                        <MenuItem value={0}>And</MenuItem>
                        <MenuItem value={1}>Or</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    className={classes.button}
                    onClick={() => {
                        setFullNameFilter("");
                        setEmailFilter("");
                        setPhoneFilter("");
                        setOperatorFilter(0);

                    }}
                    size="large"
                    variant="contained"
                    startIcon={<BackspaceIcon />}
                >
                </Button>
            </div>

            <Button
                className={classes.button}
                component={Link}
                to="/admin/trainers/create"
                size="medium"
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}>
                Add trainer
            </Button>

            <div style={{ width: '1160px'}}>
                <DataGrid
                    autoHeight={true}
                    disableExtendRowFullWidth={true}
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
                />
            </div>
        </div>
    )


}

export default TrainersList