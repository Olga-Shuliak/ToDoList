import {ButtonElement} from './ButtonElement';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './Input.module.css';

type FullInputPropsType = {
  callback: (newTaskTitle: string) => void
  error: string | null
}

export const FullInput = (props: FullInputPropsType) => {
  let [newTaskTitle, setNewTaskTitle] = useState('')


  const addTaskHandler = () => {
    props.callback(newTaskTitle);
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

  return (
      <div>

        <input className={props.error ? classes.error : ''}
               value={newTaskTitle}
               onKeyPress={onKeyPressHandler}
               onChange={onChangeHandler}/>

        <ButtonElement name={'+'}
                       callback={addTaskHandler}/>

      </div>
  )
}
