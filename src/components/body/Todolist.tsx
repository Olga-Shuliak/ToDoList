import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './Todolist.module.css';
import {Button} from '../Button';
import {Input} from '../Input';

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

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    // if (event.charCode===13) {
    if (event.key == 'Enter') {
      addTaskHandler();
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }

  const tasksFilterHandler = (filterValue: string) => {
    props.tasksFilter(filterValue);
  }

  const removeTaskHandler = (id: number) => {
    props.removeTask(id)
  }

  return (
      <div className={classes.wrapper}>
        <h3>{props.title}</h3>
        <div>
          {/*<input value={newTaskTitle}*/}
          {/*       onKeyPress={onKeyPressHandler}*/}
          {/*       onChange={onChangeHandler}/>*/}

          {/*/!*<button onClick={addTaskHandler}>+</button>*!/*/}

          {/*<Button name={'+'}  callback={addTaskHandler}/>*/}

          {/*<FullInput callback={props.addTask}/>*/}

          <Input newTaskTitle={newTaskTitle}
                 onChangeHandler={onChangeHandler}
                 onKeyPressHandler={onKeyPressHandler}/>
          <Button name={'+'} callback={addTaskHandler}/>

        </div>
        <ul className={classes.tasks}>
          {props.tasks.map((task, index) => {
            //debugger
            return (
                <li key={task.id}>
                  {/*<button onClick={() => props.removeTask(task.id)}>Delete</button>*/}
                  {/*<button onClick={() => removeTaskHandler(task.id)}>Delete</button>*/}

                  <Button name={'x'} callback={() => removeTaskHandler(task.id)}/>

                  <input type="checkbox" checked={task.isDone}/>
                  <span>{task.title}</span>
                </li>
            )
          })}
        </ul>
        <div>
          {/*<button onClick={() => props.tasksFilter('All')}>All</button>*/}
          {/*<button onClick={() => props.tasksFilter('Active')}>Active</button>*/}
          {/*<button onClick={() => props.tasksFilter('Completed')}>Completed</button>*/}

          {/*<button onClick={() => tasksFilterHandler('All')}>All</button>*/}
          {/*<button onClick={() => tasksFilterHandler('Active')}>Active</button>*/}
          {/*<button onClick={() => tasksFilterHandler('Completed')}>Completed</button>*/}

          <Button name={'All'} callback={() => tasksFilterHandler('All')}/>
          <Button name={'Active'} callback={() => tasksFilterHandler('Active')}/>
          <Button name={'Completed'} callback={() => tasksFilterHandler('Completed')}/>
        </div>
      </div>
  )
}
