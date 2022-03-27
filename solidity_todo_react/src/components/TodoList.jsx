import { Todo } from './Todo'
export const TodoList = (props) => {
  const { task } = props
  return (
    <ul
      style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '0',
      }}>
      {task.map((todo, i) => (
        <Todo title={todo} key={i} />
      ))}
    </ul>
  )
}
