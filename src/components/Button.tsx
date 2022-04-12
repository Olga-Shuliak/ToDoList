import classes from './Button.module.css';


type PropsButtonType = {
  name: string
  callback: () => void
  nameButton?: string
}

export const Button = (props: PropsButtonType) => {

  const onClickHandler = () => {
    props.callback();
  }

  return (
      <button className={props.name === props.nameButton ? classes.active : ''} onClick={onClickHandler}>{props.name}</button>
  )

}
