import React from 'react';
import './Home.css';
import plus from './plus.png';
import people from './people.png';
import list from './to-do-list.png';
import {Link} from 'react-router-dom';
// import {  
//   BrowserRouter as Router,  
//   Routes,
//   Route,
//   NavLink
// }   
// from 'react-router-dom';  
import AddRecipe from './AddRecipe';
import ShoppingList from './ShoppingList';
import Contacts from './Contacts';

function Home() {
    
    let imageStyle = {
        backgroundImage:
          'url("https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "white", 
    };

    return (
      
        <div className='App'>
            <header className="App-header" style = {imageStyle} >
                <div className="title">
                    <h1> RECIPES</h1>
                </div>
            </header>
            <div className='body'>
              <ul>
                <li>To get the ingredients menu, type '@'</li>
                <li>If the required ingredient is not available, type it in the dropdown editable input box to add it to the menu</li>
                <li>To add a tip, mark the beginning and the end of the tip with '#'</li>
              </ul>
            </div>
            <div className = "bottom">
            {/* <Router>
              <Routes>
                <Route path = "/" element = {<App/>}></Route>
                <Route exact path='shopping_list' element={<ShoppingList/>} />
                <Route exact path='add_recipe' element={<AddRecipe/>} />
                </Routes>
                <NavLink to="/shopping_list"><button className = "list-btn"><img className= "list" src = {list} alt = "list" /></button></NavLink>
                <NavLink to="/add_recipe"><button className = "add-btn"><img className = "add" src = {plus} alt = "add"/></button></NavLink>                
                <button className = "people-btn"><img className = "people" src = {people} alt = "contacts"/></button>
                </Router> */}
                <Link to="/shopping_list" element = {<ShoppingList/>}><button className = "list-btn"><img className= "list" src = {list} alt = "list" /></button>
</Link>
                <Link to="/add_recipe" element = {<AddRecipe/>}><button className = "add-btn"><img className = "add" src = {plus} alt = "add"/></button></Link> 
                <Link to="/contacts" element = {<Contacts/>}><button className = "people-btn"><img className = "people" src = {people} alt = "contacts"/></button></Link>
            </div>
        </div>
        
    );
};
 
export default Home;