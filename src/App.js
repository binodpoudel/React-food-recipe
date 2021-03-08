import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';

import Recipe from './component/Recipe'

import { makeStyles, createStyles, } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';


import SearchIcon from '@material-ui/icons/Search';




////// this is css style 

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      margin: '10px auto',
      alignItems: 'center',
      width: 450,
    },
  
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    }
    
  }),

);


function App() {

  const classes = useStyles();


  const APP_ID = 'type ID here ';
  const APP_KEY = 'Type KEY here and run project';
  
  const [recipes, setRecipes] = useState([])

  const [search, setSearch] = useState('');

  const [query, setQuery] = useState('chicken');

  useEffect(() => {
   getRecipe();
  }, [query] );

  const getRecipe = async () => {
    const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);

    setRecipes(response.data.hits);

    console.log(response.data.hits);
  };

  const updateSearch = (event)=> {
    setSearch(event.target.value)
    /*console.log(event.target.value) */
  }
  
  const updateQuery = (event) => {
    event.preventDefault();

    setQuery(search);
  }
  return (
    <div className="app">
     
      <Paper onSubmit={updateQuery} component="form" className={classes.root}>
      
      <InputBase
        type='text' value={search} onChange={updateSearch}
        className={classes.input}
        placeholder="Food Recipe (Before type write your KEY and ID)"
        inputProps={{ 'aria-label': 'search food recipe' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      
      
    </Paper>
      
      <div  style={{marginLeft:'2rem', margin:'5rem'}}>
        <Grid  lg={12} item  container spacing={2}>
          { recipes.map((recipe, index) => ( 
            <Grid key={index} item lg={3} xs={6}>
              <Recipe 
              label={recipe.recipe.label}
              title ={recipe.recipe.label} 
              calories={recipe.recipe.calories} 
              image={recipe.recipe.image} 
              ingredients={recipe.recipe.ingredients}/>
            </Grid>
          ))}

        </Grid>
     </div>
    </div>
  );
}

export default App;
