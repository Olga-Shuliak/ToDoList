import React, {useState} from 'react';
import './App.css';
import {Header} from './components/Header';
import {Todolist} from './components/Todolist';

function App() {

  // const tasks1 = [
  //   {id: 1, title: 'HTML&CSS', isDone: true},
  //   {id: 2, title: 'JS', isDone: true},
  //   {id: 3, title: 'React', isDone: false},
  //   {id: 4, title: 'Redux', isDone: false},
  //   {id: 5, title: 'Angular', isDone: false}
  // ]
  //чтобы отрисовало то, что лежит под тем же номером (памяти), нужен хук

  let [tasks, setTasks] = useState(
      [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Angular', isDone: false}
      ]
  )


  const removeTask = (newId: number) => {
    setTasks(tasks.filter(task => task.id !== newId))
  }


  let [nameButton, setNameButton] = useState('All')

  const tasksFilter = (nameButton: string) => {
    setNameButton(nameButton)
  }

  let filterTasks = tasks;
  if (nameButton === 'Active') {
    filterTasks = tasks.filter(task => !task.isDone)
  } else if (nameButton === 'Completed') {
    filterTasks = tasks.filter(task => task.isDone)
  }

//добавляем таску
  const addTask = (newTaskTitle: string) => {
    let newTask = {id: Math.random() * 100, title: newTaskTitle, isDone: false};
    setTasks([newTask, ...tasks])
  }

  const changeStatusCheckbox = (currentID: number, eventStatus: boolean) => {
    setTasks(tasks.map((el) => el.id === currentID ? {...el, isDone: eventStatus} : el))
  }


  return (
      <div className="App">
        <Header title={'TO DO LIST'}/>
        <Header title={'My To Do List'}/>
        <div className="listsBlock">
          <Todolist title={'What to learn 1'}
                    tasks={filterTasks}
                    removeTask={removeTask}
                    tasksFilter={tasksFilter}
                    addTask={addTask}
                    changeStatusCheckbox={changeStatusCheckbox}
                    nameButton={nameButton}
          />

        </div>

      </div>
  );
}

export default App;
