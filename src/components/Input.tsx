import {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './Input.module.css';


type InputPropsType = {
  newTaskTitle: string
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyPressHandler: (event: KeyboardEvent<HTMLInputElement>) => void
  error: string | null
}

export const Input = (props: InputPropsType) => {


  return (
      <input className={props.error ? classes.error : ''}
             value={props.newTaskTitle}
             onChange={props.onChangeHandler}
             onKeyPress={props.onKeyPressHandler}/>
  )
}
