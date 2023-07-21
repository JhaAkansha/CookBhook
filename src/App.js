import React from 'react';
import './App.css';
import {  
  BrowserRouter as Router,  
  Routes,
  Route,
  NavLink
}   
from 'react-router-dom';  
import AddRecipe from './AddRecipe';
import ShoppingList from './ShoppingList';
import Home from './Home.js';
import Contacts from './Contacts.js';

function App() {

    return (
      
        <div className='App'>
            <Router>
              <Routes>
                <Route path = "/" element = {<Home/>}></Route>
                <Route exact path='shopping_list' element={<ShoppingList/>} />
                <Route exact path='add_recipe' element={<AddRecipe/>} />
                <Route exact path = 'contacts' element={<Contacts/>}/>
                </Routes>
                <NavLink to="/shopping_list"></NavLink>
                <NavLink to="/add_recipe"></NavLink>
                <NavLink to= "/contacts"></NavLink>           
                </Router>
            </div>        
    );
};
 
export default App;