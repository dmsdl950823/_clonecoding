import React, { useState } from 'react';
import logo from './logo.svg';
import List from './components/List'
import './App.css';
import AddToList from './components/AddToList';

// props define
export interface IState {
  people: {
    name: string;
    age: number;
    url: string;
    note?: string
  }[] // array type
}


function App() {
  const [number, setNumber] = useState<number>(5) // useState<number | string>(5)

  const changeNumber = () => {
    setNumber(10) // ("10") auto type checking..!!
  }

  // === real project
  const [people, setPeople] = useState<IState["people"]>([  // === useState<{ age: number, name: string }[]>([])
    { name: 'Lebron James', url: '', age: 35, note: 'something...' },
    { name: 'me', url: '', age: 24 },
  ])

  // people.map(person => {
  //   // person.height = '55' // error!
  //   person.age = 20
  //   person.note = '?'
  // })

  return (
    <div className="App">
      <h1>People Invited to my Party</h1>
  
      <List people={people}/>
      {/* if childeren don't have props => error!*/}

      <AddToList people={people} setPeople={setPeople}/>
    </div>
  );
}

export default App;
