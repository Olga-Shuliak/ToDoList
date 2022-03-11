import classes from './Header.module.css'

type HeaderPropsType = {
  title: string
}

export const Header = (props: HeaderPropsType) => {
  return (
      <div className={classes.header}>{props.title}</div>
  )
}
