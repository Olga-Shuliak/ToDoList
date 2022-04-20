import React, {ChangeEvent} from 'react';

type CheckBoxPropsType = {
  todoListID: number
  taskIsDone: boolean
  callBack: (todoListID: number, id: number, isChecked: boolean)=>void
  id: number
}

export const CheckBox = (props:CheckBoxPropsType) => {

  const checkBoxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.callBack(props.todoListID, props.id, event.currentTarget.checked);
  }

  return (
          <input type="checkbox"
                 checked={props.taskIsDone}
                 onChange={checkBoxHandler}/>
      )

}

