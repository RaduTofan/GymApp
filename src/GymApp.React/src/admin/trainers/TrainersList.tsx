import { useGetAllTrainers } from "../../api/trainer/index";
import React, { useEffect, useState } from 'react';
import { ColDef, DataGrid, PageChangeParams, SortModelParams } from '@material-ui/data-grid';

const TrainersList = () => {
    let [items, setItems] = useState([]);
    useEffect(() => {
        FetchItem();
    }, []);

    let FetchItem = async () => {
        let data = await useGetAllTrainers();
        setItems(data);
    }

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
                    rows={items ?? []}
                    columns={columns}
                />
            }
            {console.log(items)}
        </div>
    )


}

export default TrainersList