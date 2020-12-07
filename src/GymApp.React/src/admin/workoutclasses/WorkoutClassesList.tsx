import { useGetAllWorkoutClasses, getWorkoutClassesPaged } from "../../api/workoutclass/index";
import React, { useEffect, useState } from 'react';
import { ColDef, DataGrid, PageChangeParams, SortDirection, SortModelParams } from '@material-ui/data-grid';
import { WorkoutClassGridRow } from '../../api/workoutclass/models/WorkoutClassGridRow';
import { PaginatedResult } from '../../lib/grid/PaginatedResult';

const WorkoutClassList = () => {
    const [loading, setLoading] = useState(true);
    const [paginatedWorkoutClasses, setPaginatedWorkoutClasses] = useState<PaginatedResult<WorkoutClassGridRow>>();
    const [page, setPage] = useState(0);
    const [sortColumn, setSortColumn] = useState('scheduledTime');
    const [sortDirection, setSortDirection] = useState('desc');

    const handlePageChange = (params: PageChangeParams) => {
        setPage(params.page - 1);
    };

    const sortModel = [
        {
          field: sortColumn,
          sort: sortDirection as SortDirection,
        },
      ];

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

    }, [page, sortColumn, sortDirection]);

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
        { field: 'exercisePlan', headerName: 'Exercise Plan', width: 200 }


    ];


    return (
        <div style={{ height: 500, width: '98%', marginTop: 20, padding:"2%"}}>
             {
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
                sortModel={sortModel}
            />
        }
        {console.log(paginatedWorkoutClasses?.items)}
        </div>
    )


}

export default WorkoutClassList;