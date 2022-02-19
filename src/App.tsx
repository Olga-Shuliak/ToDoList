import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {
  //вынести верстку в отдельную компоненту, дважды вызвать

  const tasks1 = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Redux", isDone: false},
    {id: 5, title: "Angular", isDone: false}
      ]

  const tasks2 = [
    {id: 1, title: "Hello world", isDone: true},
    {id: 2, title: "I am happy", isDone: false},
    {id: 3, title: "Yo", isDone: false}
  ]


  return (
    <div className="App">
      <Todolist title={'What to learn 1'} tasks={tasks1}/>
      <Todolist title={'What to learn 2'} tasks={tasks2}/>
    </div>
  );
}

export default App;
