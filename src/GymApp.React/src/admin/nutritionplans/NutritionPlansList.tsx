import { createStyles, FormControl, Grid, InputLabel, List, ListItem, ListItemText, makeStyles, MenuItem, Select, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { getAllNutritionPlans, getNutritionPlanById, getYtVideosId } from '../../api/nutritionplan';
import { NutritionPlan } from '../../api/nutritionplan/models/NutritionPlan';
import { Meal } from '../../api/nutritionplan/models/Meal';


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



const NutritionPlansList = () => {
    const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>([] as NutritionPlan[]);
    const [searchedNutritionPlan, setSearchedNutritionPlan] = useState(0);
    const [meals, setMeals] = useState<Meal[]>([] as Meal[]);
    const [videoIds, setVideoIds] = useState<number[]>([] as number[]);

    const classes = useStyles();


    useEffect(() => {
        (async () => {
            try {
                const nutPlans = await getAllNutritionPlans();
                setNutritionPlans(nutPlans);
            } catch (error) {
                console.error(error);
            }
        })()
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (searchedNutritionPlan > 0) {
                    let data = await getNutritionPlanById(searchedNutritionPlan)();
                    setMeals(data.meals);
                    let ytVideosId = await getYtVideosId(data.nutritionType);
                    var idArray = [];
                    for (let element of ytVideosId.items) {
                        idArray.push(element.id.videoId);
                    }
                    setVideoIds(idArray);
                    console.log(videoIds);
                }
            } catch (error) {
                console.error(error);
            }
        })();

    }, [searchedNutritionPlan]);

    var mealsText = "";
    if (searchedNutritionPlan > 0) {
        mealsText = "Meals"
    }



    return (<div style={{ padding: "2%" }}>

        <h1 className={classes.marginAutoItem}>Nutrition plan research</h1>

        <FormControl
            style={{ minWidth: 250 }}>
            <InputLabel >Select nutrition plan</InputLabel>
            <Select
                onChange={(event: any) => {
                    setSearchedNutritionPlan(event.target.value);
                }}>
                <MenuItem value={-1} disabled>Select nutrition plan</MenuItem>
                {
                    nutritionPlans.map(p => (
                        <MenuItem key={p.id} value={p.id}>{p.nutritionType}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>

        <Grid item xs={12} md={6} className={classes.marginAutoItem}>
            <Typography variant="h6" className={classes.title}>
                {mealsText}
            </Typography>
            <div className={classes.demo}>
                <List>
                    {
                        meals.map((p) => (
                            <ListItem key={p.id}>
                                <ListItemText primary={p.mealName} />
                            </ListItem>
                        ))}
                </List>
            </div>
        </Grid>


        <div style={{ padding: "10%" }}>{
            videoIds.map((value,index)=>{
                return <iframe width="750" height="480" src={`https://www.youtube.com/embed/${value}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            
            })
        }

        </div>



    </div>
    )
}



export default NutritionPlansList;