import React, {memo} from 'react';
import classes from './Todolist.module.css';
import {CheckBox} from './CheckBox';
import {FilterValueType, TodoListType} from '../App';
import {EditableSpan} from './EditableSpan';
import {EddItemForm} from './EddItemForm';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Paper} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from '../reducers/tasksReducer';
import {removeTodoListAC, tasksFilterAC, updateListAC} from '../reducers/todoListsReducer';


type TodolistType = {
  todoList: TodoListType
  //___________было так
  // todoListID: string
  // title: string
  // tasks: Array<TaskType>
  // removeTask: (todoListID: string, todoListID: string) => void
  // tasksFilter: (todoListID: string, nameButton: FilterValueType) => void
  // addTask: (todoListID: string, newTaskTitle: string) => void
  // updateTask: (todoListID: string, todoListID: string, newTaskTitle: string) => void
  // updateList: (todoListID: string, newTitle: string) => void
  // changeStatusCheckbox: (todoListID: string, currentID: string, currentEvent: boolean) => void
  // nameButton: string
  // removeTodoList: (todoListID: string) => void
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

// memo = React.memo
export const Todolist = memo(({todoList}: TodolistType) => {

  console.log('Todolist')

//деструктуризация
  const {todoListID, title, nameButton} = {...todoList}

  //достаем из редакса
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoListID])
  const dispatch = useDispatch()
//______________________________________________________________________

  const addTaskHandler = (newTaskTitle: string) => {
    dispatch(addTaskAC(todoListID, newTaskTitle));
  }

  const tasksFilterHandler = (todoListID: string, nameButton: FilterValueType) => {
    dispatch(tasksFilterAC(todoListID, nameButton));
  }

  let tasksForTodoList = tasks
  if (nameButton === 'Active') {
    tasksForTodoList = tasks.filter(task => !task.isDone)
  } else if (nameButton === 'Completed') {
    tasksForTodoList = tasks.filter(task => task.isDone)
  }

  const changeStatusCheckbox = (todoListID: string, currentID: string, eventStatus: boolean) => {
    dispatch(changeTaskStatusAC(todoListID, currentID, eventStatus))
  }

  const removeTaskHandler = (todoListID: string, newId: string) => {
    dispatch(removeTaskAC(todoListID, newId));
  }

  //удаляем весь лист
  const removeTodoListHandler = (todoListID: string) => {
    let action = removeTodoListAC(todoListID);
    dispatch(action);
  }

  //собираем данные для updateTask, updateList
  const updateTaskHandler = (taskID: string, newTitle: string) => {
    dispatch(updateTaskAC(todoListID, taskID, newTitle))
  }
  const updateListHandler = (newTitle: string) => {
    dispatch(updateListAC(todoListID, newTitle))
  }



  return (
      <Paper>
        <h3>
          <EditableSpan oldTitle={title}
                        callback={updateListHandler}/>


          <IconButton aria-label="delete"
                      size="small"
                      onClick={() => removeTodoListHandler(todoListID)}>
            <DeleteIcon/>
          </IconButton>

        </h3>

        <EddItemForm callback={addTaskHandler}/>

        <ul className={classes.tasks}>
          {tasksForTodoList.map((task) => {
            return (
                <li key={todoListID}
                    className={task.isDone ? classes.isDane : ''}>

                  <Button color="primary"
                          variant="text"
                          onClick={() => removeTaskHandler(todoListID, task.id)}>x</Button>


                  <CheckBox taskIsDone={task.isDone}
                            todoListID={todoListID}
                            callBack={changeStatusCheckbox}
                            id={task.id}/>


                  {/*делаем заменяемый span*/}
                  <EditableSpan oldTitle={task.title}
                                callback={
                                  (newTaskTitle: string) => updateTaskHandler(todoListID, newTaskTitle)
                                }/>

                </li>
                //<Task />
            )
          })}
        </ul>
        <div>
          <Button onClick={() => tasksFilterHandler(todoListID, 'All')}
                  variant={'All' === nameButton ? 'contained' : 'outlined'}
                  size="small"


          >
            All
          </Button>
          <Button onClick={() => tasksFilterHandler(todoListID, 'Active')}
                  variant={'Active' === nameButton ? 'contained' : 'outlined'}
                  size="small"


          >
            Active
          </Button>
          <Button onClick={() => tasksFilterHandler(todoListID, 'Completed')}
                  variant={'Completed' === nameButton ? 'contained' : 'outlined'}
                  size="small"


          >
            Completed
          </Button>

        </div>
      </Paper>
  )
})
