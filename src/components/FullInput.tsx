import {Button} from './Button';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type FullInputPropsType ={
  callback:(newTaskTitle:string)=>void
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

        <input value={newTaskTitle}
               onKeyPress={onKeyPressHandler}
               onChange={onChangeHandler}/>

        <Button name={'+'}  callback={addTaskHandler}/>

      </div>
  )
}
