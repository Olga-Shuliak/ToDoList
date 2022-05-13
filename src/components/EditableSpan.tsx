import {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
  oldTitle: string
  callback:(newTitle: string)=>void
}


export const EditableSpan = (props: EditableSpanPropsType) => {

  let [edit, setEdit] = useState(false)
  let [newTitle, setNewTitle] = useState(props.oldTitle)

  const onDoubleClickHandler = () => {
    setEdit(true)
  }

  const onBlurHandler = () => {
    props.callback(newTitle)
    setEdit(false)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }


  return (
      edit
          ? <input value={newTitle}
                   autoFocus onBlur={onBlurHandler}
                   onChange={onChangeHandler}/>
          : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
  )
}
