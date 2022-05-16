import classes from './Button.module.css';
import Button from '@mui/material/Button'

type PropsButtonType = {
  name: string
  callback: () => void
  nameButton?: string
}

export const ButtonElement = (props: PropsButtonType) => {

  const onClickHandler = () => {
    props.callback();
  }

  return (
      //кнопка из материал юай
      <Button variant="outlined"
              className={props.name === props.nameButton ? classes.active : ''}
              onClick={onClickHandler}>
        {props.name}
      </Button>

      // <button className={props.name === props.nameButton ? classes.active : ''} onClick={onClickHandler}>{props.name}</button>
  )

}
