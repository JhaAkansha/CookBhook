import React, { useState, createRef, useCallback } from 'react';
import './AddRecipe.css';
import plus from './plus.png';
import people from './people.png';
import list from './to-do-list.png';
import CreatableSelect from 'react-select/creatable';
import { atom, RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'
import {
  ClickAwayListener,
  CssBaseline,
  Fade,
  List,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system'
import {
  Link
} from 'react-router-dom';
// import {Home} from './Home.js';
import ShoppingList from './ShoppingList.js';
import Contacts from './Contacts.js';

const suggestionsState = atom({
  key: 'Band Suggestions Visible?',
  default: false,
})

const inputState = atom({
  key: 'Suggestable Input Bands',
  default: '',
})

function Suggestions({ field }) {
  const [hasSuggestions, setHasSuggestions] = useRecoilState(suggestionsState)
  const [value, setValue] = useRecoilState(inputState)
  const [options, setOptions] = useState([]);

  
  const handleClickAway = useCallback(() => {
    setHasSuggestions(false)
    field.current.focus()
  }, [field, setHasSuggestions])


  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });

  const handleCreate = (inputValue, e) => {
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setOptions((prev) => [...prev, newOption]);
    }, 1000);
    setValue(value + inputValue);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Fade in={hasSuggestions}>
        <List>
      <CreatableSelect 
          isSearchable
          isClearable
          className = 'dropdown'
          onChange={(newValue) => setValue(value + (newValue.label))}
          onCreateOption={handleCreate}
          options={options}
          value={value}
        />
        </List>
      </Fade>
    </ClickAwayListener>
  )
}

function SuggestionsField({addStep, addIng, addTip}) {
  const textFieldRef= createRef()

  const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      
      let ings = getTokens('@', value)
      if (ings.length > 0) {
        addIng(ings)
        // ShoppingList().addItem(ings)
      }

      let tips = getTokens('#', value)
      if (tips.length > 0) {
        addTip(tips)
      }
      
      addStep(value.replaceAll("@", "").replaceAll("#", ""))
      setValue("");
  }
  const setHasSuggestions = useSetRecoilState(suggestionsState)
  const [value, setValue] = useRecoilState(inputState)

  const handleChange = useCallback(
    event => {
      setValue(event.target.value)
      if (event.target.value.match(/@$/)) {
        setHasSuggestions(true)
      } 
      else setHasSuggestions(false)
    },
    [setHasSuggestions, setValue]
    )

  return (
    <Box p={4} display="inline-block">
      <form onSubmit={handleSubmit}>
      <TextField
        inputRef={textFieldRef}
        label="Type"
        value={value}
        onChange={handleChange}
        handleChange={e => setValue(e.target.value)}
      />
      </form>
      <Suggestions field={textFieldRef} />
    </Box>
  )
}

function Step({step, index}) {
  return (
      <ul>
          <li>{step.title}</li>
      </ul>
  );
}

function Ing({ing, index}) {
  return (
      <ul>
          <li>{ing.title}</li>
      </ul>
  );
}

function Tip({tips, index}) {
  return (
      <ul>
          <li>{tips.title}</li>
      </ul>
  );
}

function getTokens(tokenIdentifier, string) {
  let regexString = "@.+@|@[\\w-]+"
  regexString = regexString.replaceAll("@", tokenIdentifier)
  let regex = new RegExp(regexString)
  let tokens = []

  if (regex.test(string)) {
    let matches = string.match(regex)
    for (let i=0; i<matches.length; i++) {
      tokens.push(matches[i].replaceAll(tokenIdentifier, ''))
    }
  }
  return tokens
}

function App() {
  const [steps, setSteps] = useState([]);
  const [ing, setIng] = useState([]);
  const [tips, setTips] = useState([]);
  
  let imageStyle = {
    backgroundImage:
      'url("https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "white", 
   };

  const addStep = title => {
    const newSteps = [...steps, {title}];
    setSteps(newSteps);
  }

  const addIng = title => {
    const newIng = [...ing, {title}];
    setIng(newIng);
  }

  const addTip = title => {
    const newTip = [...tips, {title}];
    setTips(newTip);
  }

  return (
    <div className="App">
      <header className="App-header" style = {imageStyle} >
        <div className="title">
        <h1> RECIPES</h1>
        </div>
      </header>
      <div className='body'>
      <div className = "servings"> Servings: serves 4 </div>
      <div className = 'tips-parent'>
      <div className='tips-title'>Tips and tricks</div>
      <div className='tips'>
      {tips.map((value, index) => (
                      <Tip
                      tips={value}
                      index={index}
                      />
                  ))}
      </div>
      </div>
      <div className = "ingredient-list"> Ingredients </div>
      <div className='ingredients'>
      {ing.map((value, index) => (
                      <Ing
                      ing={value}
                      index={index}
                      />
                  ))}
      </div>
      <div className = "method"> Steps </div>
      <div className="steps">
                  {steps.map((value, index) => (
                      <Step
                      step={value}
                      index={index}
                      />
                  ))}
                   <RecoilRoot>
      <CssBaseline />
      <SuggestionsField addStep={addStep} addIng={addIng} addTip={addTip}/>
    </RecoilRoot>
              </div>
      </div>
      <div className = "bottom">
        {/* <Link to = '/' element = {<Home/>}></Link> */}
        <Link to = '/shopping_list' element = {<ShoppingList/>}><button className = "list-btn"><img className= "list" src = {list} alt = "list"/></button></Link>
        <button className = "add-btn"><img className = "add" src = {plus} alt = "add"/></button>
        <Link to = '/contacts' element = {<Contacts/>}><button className = "people-btn"><img className = "people" src = {people} alt = "contacts"/></button></Link>
      </div>
    </div>
  );
}

export default App;