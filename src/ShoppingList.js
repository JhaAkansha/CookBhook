import React from 'react';
import './ShoppingList.css';
import {useState} from 'react';
import plus from './plus.png';
import people from './people.png';
import list from './to-do-list.png';
import {
    Link
  }   
  from 'react-router-dom';  
import AddRecipe from './AddRecipe.js';
import icon from './icon.svg';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import Contacts from './Contacts.js';

const animatedComponents = makeAnimated();

function Item({ item, index, complete, remove }) {
    //const[val, setVal] = useState(50);\
    const [opt, setOpt] = useState("");

    const options = [
        {value:'scarce', label:'Scarce'},
        {value:'enough', label: 'Enough'},
        {value: 'plenty', label: 'Plenty'}
    ]

    const handleChange = (selectedOption) => {
        if (selectedOption.value === 'plenty') {
            setOpt("P");
        }
        else if (selectedOption.value === 'enough') {
            setOpt("E");
        }
        else if (selectedOption.value === 'scarce'){
            setOpt("S");
        }
        return opt;
    }
    console.log(opt);
    const customStyles = {
        opt,
        option: (provided, state) => ({
          ...provided,
           color: state.isSelected ? 'white' : 'black',
          backgroundColor: state.isSelected ? 'green' : 'white'
        // backgroundColor: (opt === "P") ? (console.log(opt)) : "lavender"
        }),
        control: (provided) => ({
          ...provided,
          marginTop: "10px",
          color: 'yellow',
          width: '200px',
          fontSize: '15px',
          fontFamily: 'Voltaire',
          height: '20px',
          border: '2px solid #aae0ec',
          minHeight: '40px',
        })
      }

    const MyComponent = () => (
        <Select placeholder = 'Quantity' options={options}  onChange = {handleChange} components={animatedComponents} styles={customStyles}/>
      )

    return (
        <tr className='item-parent'>
        <td
            className="item"
            style={{ textDecoration: item.completed ? "line-through" : "" }}
        >
            <img className= 'icon' alt = 'icon' src = {icon}></img>
            {item.title}
            </td>
            <td><button className = "remove" onClick={() => remove(index)}>Delete</button></td>
            <td><button className = "complete" onClick={() => complete(index)}>Bought</button></td>
            {/* <div className='slidecontainer'>
                <span className='scarce'>Scarce</span>
            <input
                type="range"
                min="0"
                max="100"
                value={val}
                onChange = {e => setVal(e.target.val)}
                className='slider'
                />
                <span className='plenty'>Plenty</span>
            </div> */}
            <td className='inventory'>
                <MyComponent/>
                {/* <button className='buttonLow'>Scarce</button>
                <button className='buttonMid'>Enough</button>
                <button className='buttonHigh'>Plenty</button> */}
            </td>
            </tr>
        
    );
}

 function AddItem({ addItem }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        
        addItem(value);
        setValue("");
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new item"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

 function ShoppingList() {
    let imageStyle = {
        backgroundImage:
          'url("https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "white", 
    };

    const [items, setItems] = useState([]);
    
    const addItem = title => {
        const newItems = [...items, { title, completed: false }];
        setItems(newItems);
        
    };

    // const addItem = addItemGenerator(setItems, items)
    
    const complete = index => {
        const newItems = [...items];
        newItems[index].completed = true;
        setItems(newItems);
    };

    const remove = index => {

      const newItems = [...items];

      newItems.splice(index, 1);

      setItems(newItems);

  };

    return (
        <div className='App'>
            <header className="App-header" style = {imageStyle} >
                <div className="title">
                    <h1> RECIPES</h1>
                </div>
            </header>
            {items.length > 0 ? (
            <table className="items">
                <ol>
                  {items.map((item, index) => (
                     <li>
                        {/* <img className= 'icon' alt = 'icon' src = {icon}></img> */}
                        <Item
                            item={item}
                            index = {index}
                            complete={complete}
                            remove={remove}
                            key={index}
                        />
                      </li>
                  ))}
                  </ol>
              </table> 
              ) : (
                <div className = "empty">
                <p> Nothing to buy! </p>
              </div>
              )}
              <div className="create-item" >
                  <AddItem addItem={addItem} />
              </div>

              <div className = "bottom">
              {/* <Routes>
                <Route path='/add_recipe' element={<AddRecipe/>} />
                </Routes> */}
                <button className = "list-btn"><img className= "list" src = {list} alt = "list" /></button>
                <Link to="/add_recipe" element = {<AddRecipe/>}><button className = "add-btn"><img className = "add" src = {plus} alt = "add"/></button></Link>                
                <Link to = '/contacts' element = {<Contacts/>}><button className = "people-btn"><img className = "people" src = {people} alt = "contacts"/></button></Link>
            </div>
        </div>
    );
};
 
export default ShoppingList;