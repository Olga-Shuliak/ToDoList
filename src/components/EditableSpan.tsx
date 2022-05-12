import {useState} from 'react';

type EditableSpanPropsType = {
  oldTitle: string
}


export const EditableSpan = (props: EditableSpanPropsType) => {

  let [edit, setEdit] = useState(true)

  return (
      edit
      ? <input value={props.oldTitle}/>
      : <span>{props.oldTitle}</span>
  )
}
