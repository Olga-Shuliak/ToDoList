import React from 'react';
import classes from './Todolist.module.css';
import {Button} from './Button';
import {CheckBox} from './CheckBox';
import {FilterValueType} from '../App';
import {EditableSpan} from './EditableSpan';
import {EddItemForm} from './EddItemForm';

type Todolist = {
  todoListID: number
  title: string
  tasks: Array<ObjInArray>
  removeTask: (todoListID: number, id: number) => void
  tasksFilter: (todoListID: number, nameButton: FilterValueType) => void
  addTask: (todoListID: number, newTaskTitle: string) => void
  updateTask: (todoListID: number, id: number, newTaskTitle: string) => void
  updateList: (todoListID: number, newTitle: string)=>void
  changeStatusCheckbox: (todoListID: number, currentID: number, currentEvent: boolean) => void
  nameButton: string
  removeTodoList: (todoListID: number) => void
}
export type ObjInArray = {
  id: number
  title: string
  isDone: boolean
}

export const Todolist = (props: Todolist) => {


  const addTaskHandler = (newTaskTitle: string) => {
    props.addTask(props.todoListID, newTaskTitle);
  }


  const tasksFilterHandler = (todoListID: number, filterValue: FilterValueType) => {
    props.tasksFilter(todoListID, filterValue);
  }

  const removeTaskHandler = (todoListID: number, id: number) => {
    props.removeTask(todoListID, id)
  }

  //удаляем весь лист
  const removeTodoListHandler = (todoListID: number) => {
    props.removeTodoList(todoListID)
  }

  //собираем данные для updateTask, updateList
  const updateTaskHandler = (taskID: number, newTitle: string) => {
    props.updateTask(props.todoListID, taskID, newTitle)
  }
  const updateListHandler = (newTitle: string) => {
    props.updateList(props.todoListID, newTitle)
  }


  return (
      <div className={classes.wrapper}>
        <h3>
          <EditableSpan oldTitle={props.title}
                        callback={updateListHandler}/>
          <Button name={'X'}
                  callback={() => removeTodoListHandler(props.todoListID)}/>
        </h3>

        <EddItemForm callback={addTaskHandler}/>

        <ul className={classes.tasks}>
          {props.tasks.map((task) => {
            return (
                <li key={task.id}
                    className={task.isDone ? classes.isDane : ''}>

                  <Button name={'x'}
                          callback={() => removeTaskHandler(props.todoListID, task.id)}/>

                  <CheckBox taskIsDone={task.isDone}
                            todoListID={props.todoListID}
                            callBack={props.changeStatusCheckbox}
                            id={task.id}/>

                  {/*<span>{task.title}</span>*/}
                  {/*делаем заменяемый спан*/}
                  <EditableSpan oldTitle={task.title}
                                callback={
                                  (newTaskTitle: string) => updateTaskHandler(task.id, newTaskTitle)
                                }/>

                </li>
            )
          })}
        </ul>
        <div>
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
