
import { ClientGridRow } from '../../api/client/models/ClientGridRow';
import { PaginatedResult } from '../../lib/grid/PaginatedResult';
import React, { useEffect, useState } from 'react';
import { CellParams, ColDef, DataGrid, PageChangeParams, SortDirection, SortModelParams } from '@material-ui/data-grid';
import { getClientsPaged, useGetAllClients } from "../../api/client/index";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';

const ClientsList = () => {
    const [loading, setLoading] = useState(true);
    const [paginatedClients, setPaginatedClients] = useState<PaginatedResult<ClientGridRow>>();
    const [page, setPage] = useState(0);
    const [sortColumn, setSortColumn] = useState('height');
    const [sortDirection, setSortDirection] = useState('asc');

    const history = useHistory();

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
                let data = await getClientsPaged({
                    pageIndex: page,
                    pageSize: 5,
                    columnNameForSorting: sortColumn,
                    sortDirection: sortDirection
                });
                setPaginatedClients(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();

    }, [page, sortColumn, sortDirection]);

    
      
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
            renderCell: (params: CellParams) => {
                const onClick = () => {
                    const clickedRow=params.row;
                    history.push({
                        pathname: 'clients/update',
                        state: {client: clickedRow}
                    });
                };

                return <Button onClick={onClick}>Edit</Button>;
            }
        }
        
    ];


    return (
        <div style={{ height: 500, width: '98%', marginTop: 20, padding: "2%" }}>
            <Button component={Link} to="/admin/clients/create" size="medium" variant="contained" color="primary">
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
                    sortModel={sortModel}
                />
        </div>
    )


}

export default ClientsList