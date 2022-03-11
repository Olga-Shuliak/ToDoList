import classes from './Body.module.css'
import React, {useState} from 'react';
import {Todolist} from './Todolist';

export const Body = () => {

  // const tasks1 = [
  //   {id: 1, title: 'HTML&CSS', isDone: true},
  //   {id: 2, title: 'JS', isDone: true},
  //   {id: 3, title: 'React', isDone: false},
  //   {id: 4, title: 'Redux', isDone: false},
  //   {id: 5, title: 'Angular', isDone: false}
  // ]
  //чтобы отрисовало то, что лежит под тем же номером (памяти), нужен хук

  let [tasks1, setTasks1] = useState(
      [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Angular', isDone: false}
      ]
  )

  const removeTask = (newId: number) => {
    setTasks1(tasks1.filter(task => task.id !== newId))
  }


  let [nameButton, setNameButton] = useState('All')

  const tasksFilter = (nameButton: string) => {
    setNameButton(nameButton)
  }

  let filterTasks1 = tasks1
  if (nameButton === 'Active') {
    filterTasks1 = tasks1.filter(task => !task.isDone)
  } else if (nameButton === 'Completed') {
    filterTasks1 = tasks1.filter(task => task.isDone)
  }


  return (
      <div className={classes.bodyBlock}>
        <Todolist title={'What to learn 1'}
                  tasks={filterTasks1}
                  removeTask={removeTask}
                  tasksFilter={tasksFilter}/>
      </div>
  )
}
