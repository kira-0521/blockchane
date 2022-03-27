import { useState } from 'react'
import { TodoList } from './TodoList'

export const TodoInput = () => {
  const [taskName, setTaskName] = useState('')
  const onChangeTaskName = (e) => setTaskName(e.target.value)

  const [task, setTask] = useState([])
  const onAddTodo = () => {
    const cloneTask = task.slice()
    cloneTask.push(taskName)
    setTask(cloneTask)
    setTaskName('')
  }

  return (
    <div
      className='todos'
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '40px auto 0',
      }}>
      <label style={{ fontSize: '30px', marginBottom: '20px', color: 'blue' }}>
        Todo
      </label>
      <input
        style={{ width: '200px', height: '30px', marginBottom: '10px' }}
        value={taskName}
        onChange={onChangeTaskName}
        placeholder='todoを入力してください'
      />
      <button style={{ height: '20px', fontSize: '11px' }} onClick={onAddTodo}>
        todoをタスクとして登録する
      </button>
      <TodoList task={task} />
    </div>
  )
}
