
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ClientGridRow } from '../../api/client/models/ClientGridRow';
import { PaginatedResult } from '../../lib/grid/PaginatedResult';
import React, { useEffect, useState } from 'react';
import { ColDef, DataGrid, PageChangeParams, SortModelParams } from '@material-ui/data-grid';
import { getClientsPaged, useGetAllClients } from "../../api/client/index";

const ClientsList = () => {
    const [loading, setLoading] = useState(true);
    const [paginatedClients, setPaginatedClients] = useState<PaginatedResult<ClientGridRow>>();
    const [page, setPage] = useState(0);
    const [sortColumn, setSortColumn] = useState('fullName');
    const [sortDirection, setSortDirection] = useState('asc');


    // let [items, setItems] = useState([]);
    // useEffect(() => {
    //     FetchItem();
    // }, []);

    // let FetchItem = async () => {
    //     let data = await useGetAllClients();
    //     setItems(data);
    // }

    const handlePageChange = (params: PageChangeParams) => {
        setPage(params.page - 1);
    };

    const handleSortChange = (params: SortModelParams) => {
        const sortModel = params.sortModel[0];
        if (sortModel) {
            setSortColumn(sortModel.field);
            setSortDirection(`${sortModel.sort}`);
        } else {
            setSortColumn('title');
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
    ];


    return (
        <div style={{ height: 500, width: '98%', marginTop: 20, padding: "2%" }}>
            {
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
            }
            {console.log(paginatedClients?.items)}
        </div>
    )


}

export default ClientsList