import React, {useState} from 'react';
import classes from './Todolist.module.css';

type Todolist = {
  title: string
  tasks: Array<ObjInArray>
  removeTask: (id: number) => void
  tasksFilter: (nameButton: string) => void
  addTask: (newTaskTitle: string) => void
}
type ObjInArray = {
  id: number
  title: string
  isDone: boolean
}

export const Todolist = (props: Todolist) => {

  let [newTaskTitle, setNewTaskTitle] = useState('')

  const addTaskHandler = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle('');
  }

  return (
      <div className={classes.wrapper}>
        <h3>{props.title}</h3>
        <div>
          <input value={newTaskTitle} onChange={(event) => {
            setNewTaskTitle(event.currentTarget.value)
          }}/>
          <button onClick={addTaskHandler}>+</button>
        </div>
        <ul className={classes.tasks}>
          {props.tasks.map((task, index) => {
            //debugger
            return (
                <li key={task.id}>
                  <button onClick={() => props.removeTask(task.id)}>Delete</button>
                  <input type="checkbox" checked={task.isDone}/>
                  <span>{task.title}</span>
                </li>
            )
          })}
        </ul>
        <div>
          <button onClick={() => props.tasksFilter('All')}>All</button>
          <button onClick={() => props.tasksFilter('Active')}>Active</button>
          <button onClick={() => props.tasksFilter('Completed')}>Completed</button>
        </div>
      </div>
  )
}
