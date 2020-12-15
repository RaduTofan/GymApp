import { createStyles, FormControl, Grid, InputLabel, List, ListItem, ListItemText, makeStyles, MenuItem, Select, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { getAllNutritionPlans, getNutritionPlanById, getYtVideosId } from '../../api/nutritionplan';
import { Meal } from '../../api/nutritionplan/models/Meal';
import { getAllExercisePlans } from '../../api/exerciseplan/index';
import { ExercisePlan } from '../../api/exerciseplan/models/ExercisePlan';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
          marginAutoItem: {
            padding: "2%",
            margin: 'auto'
          },
    }),
);



const ExercisePlansList = () => {
    const [exercisePlans, setExercisePlans] = useState<ExercisePlan[]>([] as ExercisePlan[]);
    const [searchedExercisePlan, setSearchedExercisePlan] = useState();
    const [videoIds, setVideoIds] = useState<number[]>([] as number[]);

    const classes = useStyles();


    useEffect(() => {
        (async () => {
            try {
                const exercisePlans = await getAllExercisePlans();
                setExercisePlans(exercisePlans);
            } catch (error) {
                console.error(error);
            }
        })()
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (searchedExercisePlan!=null) {
                    var query="";
                    for(let exercise of exercisePlans){
                        if((searchedExercisePlan as unknown as number)===exercise.id){
                            query=exercise.exercisesType;
                            break;
                        }
                    }
                    let ytVideosId = await getYtVideosId(query);
                    console.log(ytVideosId);
                    var idArray = [];
                    for (let element of ytVideosId.items) {
                        idArray.push(element.id.videoId);
                    }
                    setVideoIds(idArray);
                }
            } catch (error) {
                console.error(error);
            }
        })();

    }, [searchedExercisePlan]);



    return (<div style={{ padding: "2%" }}>

        <h1 className={classes.marginAutoItem}>Exercise plan research</h1>

        <FormControl
            style={{ minWidth: 250 }}>
            <InputLabel >Select exercise plan</InputLabel>
            <Select
                onChange={(event: any) => {
                    setSearchedExercisePlan(event.target.value);
                    console.log(event)
                }}>
                <MenuItem value={-1} disabled>Select exercise plan</MenuItem>
                {
                    exercisePlans.map(p => (
                        <MenuItem key={p.id} value={p.id}>{p.exercisesType}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>

      
        <div style={{ padding: "10%" }}>{
            videoIds.map((value,index)=>{
                return <iframe width="750" height="480" src={`https://www.youtube.com/embed/${value}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            
            })
        }

        </div>



    </div>
    )
}



export default ExercisePlansList;