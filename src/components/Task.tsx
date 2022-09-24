import classes from './Todolist.module.css';
import Button from '@mui/material/Button';
import {CheckBox} from './CheckBox';
import {EditableSpan} from './EditableSpan';
import React, {memo, useCallback} from 'react';
import {TaskType} from './Todolist';
import {useDispatch} from 'react-redux';
import {removeTaskAC, updateTaskAC} from '../reducers/tasksReducer';

type TaskPropsType = {
  task: TaskType
  // removeTask: (taskID: string)=>void
  // changeStatusCheckbox: (todoListID: string, currentID: string, currentEvent: boolean) => void
  // updateTask: (taskID: string, newTitle: string)=>void
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


  return (
      // <li key={task.id}
      //     className={task.isDone ? classes.isDane : ''}>
      //
      //   <Button color="primary"
      //           variant="text"
      //           onClick={() => removeTaskHandler()}>x</Button>
      //
      //
      //   <CheckBox taskIsDone={task.isDone}
      //             todoListID={todoListID}
      //             callBack={changeStatusCheckbox}
      //             id={task.id}/>
      //
      //
      //   {/*делаем заменяемый span*/}
      //   <EditableSpan oldTitle={task.title}
      //                 callback={
      //                   (newTaskTitle: string) => updateTaskHandler(task.id, newTaskTitle)
      //                 }/>
      //
      // </li>
      <div>Hello, component Task will be here</div>
  )
})
