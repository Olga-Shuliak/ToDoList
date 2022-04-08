import {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
  newTaskTitle: string
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyPressHandler: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = (props:InputPropsType) => {


  return (
        <input value={props.newTaskTitle}
               onChange={props.onChangeHandler}
               onKeyPress={props.onKeyPressHandler}/>
  )
}
