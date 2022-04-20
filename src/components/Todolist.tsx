import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './Todolist.module.css';
import {Button} from './Button';
import {Input} from './Input';
import {CheckBox} from './CheckBox';
import {FilterValueType} from '../App';

type Todolist = {
  todoListID: number
  title: string
  tasks: Array<ObjInArray>
  removeTask: (todoListID: number, id: number) => void
  tasksFilter: (todoListID: number, nameButton: FilterValueType) => void
  addTask: (todoListID: number, newTaskTitle: string) => void
  changeStatusCheckbox: (todoListID: number, currentID: number, currentEvent: boolean) => void
  nameButton: string
  removeTodoList: (todoListID: number)=>void
}
export type ObjInArray = {
  id: number
  title: string
  isDone: boolean
}

export const Todolist = (props: Todolist) => {

  let [newTaskTitle, setNewTaskTitle] = useState('')

  let [error, setError] = useState<string | null>('')

  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(props.todoListID, newTaskTitle.trim());
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

  const tasksFilterHandler = (todoListID: number, filterValue: FilterValueType) => {
    props.tasksFilter(todoListID, filterValue);
  }

  const removeTaskHandler = (todoListID: number, id: number) => {
    props.removeTask(todoListID, id)
  }

  //функция для изменения чекбокса
  // const checkBoxHandler = (currentID: number, currentEvent: boolean) => {
  //   props.changeStatusCheckbox(currentID, currentEvent)
  //   // console.log(event.currentTarget.checked)
  // }

  //удаляем весь лист
  const removeTodoListHandler =(todoListID: number)=> {
    props.removeTodoList(todoListID)
  }

  return (
      <div className={classes.wrapper}>
        <h3>
          {props.title}
          <Button name={'X'}
                  callback={()=>removeTodoListHandler(props.todoListID)}/>
        </h3>
        <div>
          {/*<input value={newTaskTitle}9*/}
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
          {props.tasks.map((task) => {
            return (
                <li key={task.id}
                    className={task.isDone ? classes.isDane : ''}>
                  {/*<button onClick={() => props.removeTask(task.id)}>Delete</button>*/}
                  {/*<button onClick={() => removeTaskHandler(task.id)}>Delete</button>*/}

                  <Button name={'x'}
                          callback={() => removeTaskHandler(props.todoListID, task.id)}/>

                  <CheckBox taskIsDone={task.isDone}
                            todoListID={props.todoListID}
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
                  callback={() => tasksFilterHandler(props.todoListID, 'All')}
                  nameButton={props.nameButton}/>
          <Button name={'Active'}
                  callback={() => tasksFilterHandler(props.todoListID, 'Active')}
                  nameButton={props.nameButton}/>
          <Button name={'Completed'}
                  callback={() => tasksFilterHandler(props.todoListID, 'Completed')}
                  nameButton={props.nameButton}/>
        </div>
      </div>
  )
}
