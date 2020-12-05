import { useGetAllWorkoutClasses } from "../../api/workoutclass/index";
import React, { useEffect, useState } from 'react';
import { ColDef, DataGrid, PageChangeParams, SortModelParams } from '@material-ui/data-grid';

const WorkoutClassList = () => {
    let [items, setItems] = useState([]);
    useEffect(() => {
        FetchItem();
    }, []);

    let FetchItem = async () => {
        let data = await useGetAllWorkoutClasses();
        setItems(data);
    }

    const columns: ColDef[] = [
        { field: 'id', headerName: 'Id', hide: true },
        { field: 'trainerId', headerName: 'TrainerId', width: 250 },
        { field: 'clientId', headerName: 'ClientId', width: 125 },
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
        { field: 'exercisePlanId', headerName: 'Exercise Plan Id', width: 200 }


    ];


    return (
        <div style={{ height: 500, width: '98%', marginTop: 20, padding:"2%"}}>
            {
                <DataGrid
                    rows={items ?? []}
                    columns={columns}
                />
            }
            {console.log(items)}
        </div>
    )


}

export default WorkoutClassList;