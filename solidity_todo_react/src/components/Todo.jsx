export const Todo = (props) => {
  const { title } = props
  return <li style={{ marginBottom: '5px', color: 'GrayText' }}>{title}</li>
}
