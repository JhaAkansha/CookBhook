import React from 'react';
import {useState} from 'react';
import './Contacts.css';
import plus from './plus.png';
import people from './people.png';
import list from './to-do-list.png';
import user from './user.png';
import add_user from './add-user.png';
import remove_user from './remove-user.png';
import Popup from 'reactjs-popup';
import {Link} from 'react-router-dom';
import ShoppingList from './ShoppingList.js';
import AddRecipe from './AddRecipe.js';

function CreateContact ({name,index, removeTask}) {

    return (
      <div>
        <img className= 'user' src = {user} alt = 'user'></img>
        {name}
        <button className='remove-user-btn'><img src = {remove_user} alt = 'remove-user' className='remove-user' onClick={() => removeTask(index)}></img></button>
      </div>
    )
  }

function AddContact({ addContact }) {
  const [inputs, setInputs] = useState({name:"", number:""});

  const handleSubmit = e => {
      e.preventDefault();
      if (!inputs) return;

      addContact(inputs.name, inputs.number);
      setInputs("");
    }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setInputs(values => ({...values, [name]: value}))
  }

  return (
      <form onSubmit={handleSubmit}>
      <label>Name
      <input
        required
        className='name'
        type="text" 
        name="name" 
        value={inputs.name || ""} 
        onChange={handleChange}
      />
      </label>
      <br/>
      <label>Mobile number
        <input 
        required
          className='number'
          type="number" 
          name="number" 
          value={inputs.number || ""} 
          onChange={handleChange}
        />
        </label>
        {/* <input type="submit" /> */}
        <br/>
        <button className = "addBtn" onClick = {handleSubmit}>Add</button>
    </form>
  );
}

function Contacts() {
    const [contacts, setContacts] = useState([]);

    let imageStyle = {
        backgroundImage:
          'url("https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "white", 
    };

    const addContact = (name) => {
      const newItems = [...contacts,{name}];
      setContacts(newItems);
  };

  const removeTask = (index) => {
    const newItems = [...contacts];
    newItems.splice(index, 1);
    setContacts(newItems);
};


    return (
      
        <div className='App'>
            <header className="App-header" style = {imageStyle} >
                <div className="title">
                    <h1> RECIPES</h1>
                </div>
            </header>
          <div className='contacts-added'>
            {contacts.map((contact, index) => (                
                        <CreateContact
                            removeTask={removeTask}
                            name={contact.name}
                            number={contact.number}
                            index = {index}
                            key={index}
                        />
                  ))}
          </div>
          <div className='contacts-control'>
            <Popup className = "popup" trigger = {<button className='add-user-btn'><img src = {add_user} alt = 'add-user' className='add-user'></img></button>}>
              <AddContact addContact={addContact}/>
            </Popup>
          </div>
            <div className = "bottom">
                <Link to = '/shopping_list' element = {<ShoppingList/>}><button className = "list-btn"><img className= "list" src = {list} alt = "list" /></button></Link>
                <Link to = '/add_recipe' element = {<AddRecipe/>}><button className = "add-btn"><img className = "add" src = {plus} alt = "add"/></button></Link>
                <button className = "people-btn"><img className = "people" src = {people} alt = "contacts"/></button>
            </div>
        </div>
        
    );
};
 
export default Contacts;