import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './Todolist.module.css';
import {Button} from './Button';
import {Input} from './Input';
import {CheckBox} from './CheckBox';

type Todolist = {
  title: string
  tasks: Array<ObjInArray>
  removeTask: (id: number) => void
  tasksFilter: (nameButton: string) => void
  addTask: (newTaskTitle: string) => void
  changeStatusCheckbox: (currentID: number, currentEvent: boolean) => void
  nameButton: string
}
type ObjInArray = {
  id: number
  title: string
  isDone: boolean
}

export const Todolist = (props: Todolist) => {

  let [newTaskTitle, setNewTaskTitle] = useState('')

  let [error, setError] = useState<string|null>('')

  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim());
      // setNewTaskTitle('');
    } else {
      setError('Title is required')
      // setNewTaskTitle('')
    }
    setNewTaskTitle('')
  }

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    // if (event.charCode===13) {
    if (event.key == 'Enter') {
      addTaskHandler();
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setNewTaskTitle(event.currentTarget.value)
  }

  const tasksFilterHandler = (filterValue: string) => {
    props.tasksFilter(filterValue);
  }

  const removeTaskHandler = (id: number) => {
    props.removeTask(id)
  }

  //функция для изменения чекбокса
  // const checkBoxHandler = (currentID: number, currentEvent: boolean) => {
  //   props.changeStatusCheckbox(currentID, currentEvent)
  //   // console.log(event.currentTarget.checked)
  // }


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
                 onKeyPressHandler={onKeyPressHandler}
                 error={error}/>

          <Button name={'+'}
                  callback={addTaskHandler}/>

          {error && <div className={classes.errorMessage}>{error}</div>}

        </div>
        <ul className={classes.tasks}>
          {props.tasks.map((task) =>{
            return (
                <li key={task.id}
                className={task.isDone ? classes.isDane : ''}>
                  {/*<button onClick={() => props.removeTask(task.id)}>Delete</button>*/}
                  {/*<button onClick={() => removeTaskHandler(task.id)}>Delete</button>*/}

                  <Button name={'x'}
                          callback={() => removeTaskHandler(task.id)}/>

                  <CheckBox taskIsDone={task.isDone}
                            callBack={props.changeStatusCheckbox}
                  id={task.id}/>
                  {/*<input type="checkbox"*/}
                  {/*       checked={task.isDone}*/}
                  {/*       onChange={(ev) => checkBoxHandler(task.id, ev.currentTarget.checked)}/>*/}

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

          <Button name={'All'}
                  callback={() => tasksFilterHandler('All')}
                  nameButton={props.nameButton}/>
          <Button name={'Active'}
                  callback={() => tasksFilterHandler('Active')}
                  nameButton={props.nameButton}/>
          <Button name={'Completed'}
                  callback={() => tasksFilterHandler('Completed')}
                  nameButton={props.nameButton}/>
        </div>
      </div>
  )
}
