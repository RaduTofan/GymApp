
import { ClientGridRow } from '../../api/client/models/ClientGridRow';
import { PaginatedResult } from '../../lib/grid/PaginatedResult';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { CellParams, ColDef, DataGrid, GridApi, PageChangeParams, SortDirection, SortModelParams } from '@material-ui/data-grid';
import { getClientsPaged, getAllClients } from "../../api/client/index";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { removeClient } from "../../api/client/index";
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import BackspaceIcon from '@material-ui/icons/Backspace';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


const ClientsList = () => {
    const [loading, setLoading] = useState(true);
    const [paginatedClients, setPaginatedClients] = useState<PaginatedResult<ClientGridRow>>();
    const [page, setPage] = useState(0);
    const [sortColumn, setSortColumn] = useState('height');
    const [sortDirection, setSortDirection] = useState('asc');
    const [open, setOpen] = useState(false);
    const [rowToRemove, setRowToRemove] = useState<string | number>();
    const [clientIsRemoved, setClientIsRemoved] = useState(false);
    const [fullNameFilter, setFullNameFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [phoneFilter, setPhoneFilter] = useState("");



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
            setSortColumn('height');
            setSortDirection('asc');
        }
    }


    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                let data = await getClientsPaged({
                    pageIndex: page,
                    pageSize: 5,
                    columnNameForSorting: sortColumn,
                    sortDirection: sortDirection,
                    requestFilters: {
                        logicalOperator: 0,
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
                setPaginatedClients(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();

    }, [page, sortColumn, sortDirection, clientIsRemoved,
        fullNameFilter, emailFilter, phoneFilter]);



    const columns: ColDef[] = [
        { field: 'id', headerName: 'Id', hide: true },
        { field: 'fullName', headerName: 'Full Name', width: 150 },
        {
            field: 'dateOfBirth',
            headerName: 'Date of Birth',
            width: 150,
            type: 'dateTime',
            valueFormatter: ({ value }) =>
                (new Date(`${value}`)).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                }),
        },
        { field: 'email', headerName: 'Email', width: 175 },
        { field: 'phone', headerName: 'Phone nr.', width: 125 },
        { field: 'height', headerName: 'Height (cm)', width: 125 },
        { field: 'clientWeight', headerName: 'Weight (kg)', width: 125 },
        { field: 'nutritionPlan', headerName: 'Nutrition Plan', width: 150 },
        {
            field: "",
            headerName: "Action",
            disableClickEventBubbling: true,
            width: 250,
            renderCell: (params: CellParams) => {
                const onClickEdit = () => {
                    const clickedRow = params.row;
                    history.push({
                        pathname: 'clients/update',
                        state: { client: clickedRow }
                    });
                };


                const handleItemDeletion = () => {
                    handleAlertClickOpen();
                    setRowToRemove(params.row.id);
                    setClientIsRemoved(false);

                }

                const deleteItem = () => {
                    if (rowToRemove !== undefined && typeof rowToRemove !== 'string') {
                        removeClient(rowToRemove).then(() => {
                            if (paginatedClients?.pageSize === 1) {
                                paginatedClients.pageIndex = -1;
                            }
                            setClientIsRemoved(true);

                            handleAlertClose();
                            console.log("after removed", clientIsRemoved);
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
                            aria-describedby="alert-dialog-description">
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
        <div
            id="thegrid" style={{ height: 500, width: '98%', marginTop: 20, padding: "2%" }}>
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

                <Button
                    className={classes.button}
                    onClick={() => {
                        setFullNameFilter("");
                        setEmailFilter("");
                        setPhoneFilter("");

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
                to="/admin/clients/create"
                size="medium"
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}>
                Add client
            </Button>

            <DataGrid
                rows={paginatedClients?.items ?? []}
                columns={columns}
                pagination
                pageSize={paginatedClients?.pageSize ?? 0}
                rowCount={paginatedClients?.total ?? 0}
                paginationMode="server"
                sortingMode="server"
                onSortModelChange={handleSortChange}
                onPageChange={handlePageChange}
                loading={loading}

            />

        </div >
    )


}

export default ClientsList