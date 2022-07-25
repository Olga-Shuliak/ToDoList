import React, {ChangeEvent} from 'react';

type CheckBoxPropsType = {
  todoListID: string
  taskIsDone: boolean
  callBack: (todoListID: string, id: string, isChecked: boolean)=>void
  id: string
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

