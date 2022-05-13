import classes from './Input.module.css';
import {Button} from './Button';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EddItemFormPropsType = {
  callback: (newTaskTitle: string)=>void
}


export const EddItemForm = (props:EddItemFormPropsType) => {

  let [newTaskTitle, setNewTaskTitle] = useState('')

  let [error, setError] = useState<string | null>('')

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.callback(newTaskTitle.trim());
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
      addTask();
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setNewTaskTitle(event.currentTarget.value)
  }

  return (
      <div>
        <input className={error ? classes.error : ''}
               value={newTaskTitle}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}/>

        <Button name={'+'}
                callback={addTask}/>

        {error && <div className={classes.errorMessage}>{error}</div>}

      </div>
  )
}
