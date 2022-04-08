type PropsButtonType = {
  name: string
  callback: () => void
}

export const Button = (props: PropsButtonType) => {

  const onClickHandler = () => {
    props.callback();
  }

  return (
      <button onClick={onClickHandler}>{props.name}</button>
  )

}
