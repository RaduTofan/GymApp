import { useGetAllTrainers } from "../../api/trainers/index";
import { useEffect, useState } from 'react';

function TrainersList() {
    
    let [item, setItem] = useState([]);
    useEffect(() => {
        FetchItem();
    }, []);

    let FetchItem = async () => {
        let data = await useGetAllTrainers();
        setItem(data);
    }

    return (
        <div>heheh xdddd success! wlcooooomhxdxd {console.log(item)}</div>
    )


}

export default TrainersList