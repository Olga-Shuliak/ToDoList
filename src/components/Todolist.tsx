import React, {memo, useCallback} from 'react';
import classes from './Todolist.module.css';
import {CheckBox} from './CheckBox';
import {FilterValueType} from '../App';
import {EditableSpan} from './EditableSpan';
import {EddItemForm} from './EddItemForm';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Paper} from '@mui/material';


type Todolist = {
  todoListID: string
  title: string
  tasks: Array<ObjInArray>
  removeTask: (todoListID: string, id: string) => void
  tasksFilter: (todoListID: string, nameButton: FilterValueType) => void
  addTask: (todoListID: string, newTaskTitle: string) => void
  updateTask: (todoListID: string, id: string, newTaskTitle: string) => void
  updateList: (todoListID: string, newTitle: string) => void
  changeStatusCheckbox: (todoListID: string, currentID: string, currentEvent: boolean) => void
  nameButton: string
  removeTodoList: (todoListID: string) => void
}
export type ObjInArray = {
  id: string
  title: string
  isDone: boolean
}
// memo = React.memo
export const Todolist = memo((props: Todolist) => {

console.log('Todolist')

  const addTaskHandler = useCallback((newTaskTitle: string) => {
    props.addTask(props.todoListID, newTaskTitle);
  },[props.todoListID, props.addTask])


  const tasksFilterHandler = (todoListID: string, filterValue: FilterValueType) => {
    props.tasksFilter(todoListID, filterValue);
  }

  const removeTaskHandler = (todoListID: string, id: string) => {
    props.removeTask(todoListID, id)
  }

  //удаляем весь лист
  const removeTodoListHandler = (todoListID: string) => {
    props.removeTodoList(todoListID)
  }

  //собираем данные для updateTask, updateList
  const updateTaskHandler = (taskID: string, newTitle: string) => {
    props.updateTask(props.todoListID, taskID, newTitle)
  }
  const updateListHandler = (newTitle: string) => {
    props.updateList(props.todoListID, newTitle)
  }


  return (
      <Paper
          // className={classes.wrapper}
      >
        <h3>
          <EditableSpan oldTitle={props.title}
                        callback={updateListHandler}/>

          {/*<ButtonElement name={'X'}*/}
          {/*               callback={() => removeTodoListHandler(props.todoListID)}/>*/}
          {/*<Button variant="text"*/}
          {/*        onClick={() => removeTodoListHandler(props.todoListID)}>x</Button>*/}

          <IconButton aria-label="delete"
                      size="small"
                      onClick={() => removeTodoListHandler(props.todoListID)}>
            <DeleteIcon />
          </IconButton>

        </h3>

        <EddItemForm callback={addTaskHandler}/>

        <ul className={classes.tasks}>
          {props.tasks.map((task) => {
            return (
                <li key={task.id}
                    className={task.isDone ? classes.isDane : ''}>

                  {/*<ButtonElement name={'x'}*/}
                  {/*               callback={() => removeTaskHandler(props.todoListID, task.id)}/>*/}

                  <Button color="primary"
                          variant="text"
                          onClick={() => removeTaskHandler(props.todoListID, task.id)}>x</Button>

                  {/*<IconButton aria-label="delete"*/}
                  {/*            size="small"*/}
                  {/*            onClick={() => removeTaskHandler(props.todoListID, task.id)}>*/}
                  {/*  <DeleteIcon />*/}
                  {/*</IconButton>*/}

                  <CheckBox taskIsDone={task.isDone}
                            todoListID={props.todoListID}
                            callBack={props.changeStatusCheckbox}
                            id={task.id}/>

                  {/*<span>{task.title}</span>*/}
                  {/*делаем заменяемый span*/}
                  <EditableSpan oldTitle={task.title}
                                callback={
                                  (newTaskTitle: string) => updateTaskHandler(task.id, newTaskTitle)
                                }/>

                </li>
            )
          })}
        </ul>
        <div>
          <Button onClick={() => tasksFilterHandler(props.todoListID, 'All')}
                  variant={'All' === props.nameButton ? 'contained' : 'outlined'}
                  size="small"


          >
            All
          </Button>
          <Button onClick={() => tasksFilterHandler(props.todoListID, 'Active')}
                  variant={'Active' === props.nameButton ? 'contained' : 'outlined'}
                  size="small"


          >
            Active
          </Button>
          <Button onClick={() => tasksFilterHandler(props.todoListID, 'Completed')}
                  variant={'Completed' === props.nameButton ? 'contained' : 'outlined'}
                  size="small"


          >
            Completed
          </Button>


          {/*<ButtonElement name={'All'}*/}
          {/*               callback={() => tasksFilterHandler(props.todoListID, 'All')}*/}
          {/*               nameButton={props.nameButton}/>*/}
          {/*<ButtonElement name={'Active'}*/}
          {/*               callback={() => tasksFilterHandler(props.todoListID, 'Active')}*/}
          {/*               nameButton={props.nameButton}/>*/}
          {/*<ButtonElement name={'Completed'}*/}
          {/*               callback={() => tasksFilterHandler(props.todoListID, 'Completed')}*/}
          {/*               nameButton={props.nameButton}/>*/}
        </div>
      </Paper>
  )
})
