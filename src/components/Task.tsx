import classes from './Todolist.module.css';
import Button from '@mui/material/Button';
import {CheckBox} from './CheckBox';
import {EditableSpan} from './EditableSpan';
import React, {memo, useCallback} from 'react';
import {TaskType} from './Todolist';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, removeTaskAC, updateTaskAC} from '../reducers/tasksReducer';

type TaskPropsType = {
  task: TaskType
  todoListID: string
}

export const Task = memo(({task, todoListID}: TaskPropsType) => {

  console.log('Task')

  const dispatch = useDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskAC(todoListID, task.id))
  }
  const updateTaskHandler = (taskID: string, newTitle: string) => {
    dispatch(updateTaskAC(todoListID, taskID, newTitle))
  }

  const changeStatusCheckbox = (todoListID: string, currentID: string, eventStatus: boolean) => {
    dispatch(changeTaskStatusAC(todoListID, currentID, eventStatus))
  }

  return (
      <li key={task.id}
          className={task.isDone ? classes.isDane : ''}>

        <Button color="primary"
                variant="text"
                onClick={() => removeTaskHandler()}>x</Button>


        <CheckBox taskIsDone={task.isDone}
                  todoListID={todoListID}
                  callBack={changeStatusCheckbox}
                  id={task.id}/>


        {/*делаем заменяемый span*/}
        <EditableSpan oldTitle={task.title}
                      callback={
                        (newTaskTitle: string) => updateTaskHandler(task.id, newTaskTitle)
                      }/>

      </li>

  )
})
