import { useGetAllTrainers, getTrainersPaged } from "../../api/trainer/index";
import { PaginatedResult } from '../../lib/grid/PaginatedResult';
import React, { useEffect, useState } from 'react';
import { ColDef, DataGrid, PageChangeParams, SortModelParams } from '@material-ui/data-grid';
import { TrainerGridRow } from "../../api/trainer/models/TrainerGridRow";

const TrainersList = () => {
    const [loading, setLoading] = useState(true);
    const [paginatedTrainers, setPaginatedTrainers] = useState<PaginatedResult<TrainerGridRow>>();
    const [page, setPage] = useState(0);
    const [sortColumn, setSortColumn] = useState('fullName');
    const [sortDirection, setSortDirection] = useState('asc');

    const handlePageChange = (params: PageChangeParams) => {
        setPage(params.page - 1);
    };

    const handleSortChange = (params: SortModelParams) => {
        const sortModel = params.sortModel[0];
        if (sortModel) {
            setSortColumn(sortModel.field);
            setSortDirection(`${sortModel.sort}`);
        } else {
            setSortColumn('fullName');
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
                    sortDirection: sortDirection
                });
                setPaginatedTrainers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();

    }, [page, sortColumn, sortDirection]);

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


    ];


    return (
        <div style={{ height: 500, width: '98%', marginTop: 20, padding:"2%"}}>
            {
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
            />
        }
        {console.log(paginatedTrainers?.items)}
        </div>
    )


}

export default TrainersList