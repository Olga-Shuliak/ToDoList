import React, {ChangeEvent} from 'react';

type CheckBoxPropsType = {
  taskIsDone: boolean
  callBack: (id: number, isChecked: boolean)=>void
  id: number
}

export const CheckBox = (props:CheckBoxPropsType) => {

  const checkBoxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.callBack(props.id, event.currentTarget.checked);
  }

  return (
          <input type="checkbox"
                 checked={props.taskIsDone}
                 onChange={checkBoxHandler}/>
      )

}

