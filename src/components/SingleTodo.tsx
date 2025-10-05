import React, { useRef, useState } from 'react'
import { Todo } from './model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import { BiSave } from 'react-icons/bi'
import './styles.css'

type Props = {
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const EditIcon = AiFillEdit as React.ComponentType<any>
const DeleteIcon = AiFillDelete as React.ComponentType<any>
const DoneIcon = IoCheckmarkDoneCircle as React.ComponentType<any>
const SaveIcon = BiSave as React.ComponentType<any>

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDone = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const handleEdit = (id: number) => {
    if (todo.isDone) return
    setEdit(true)
    setEditTodo(todo.todo)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleSave = () => {
    setTodos(todos.map((t) => (t.id === todo.id ? { ...t, todo: editTodo } : t)))
    setEdit(false)
  }

  return (
    <div className='todos__single'>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSave()
            }
          }}
          className='todos__single--text'
        />
      ) : todo.isDone ? (
        <s className='todos__single--text'>{todo.todo}</s>
      ) : (
        <span className='todos__single--text'>{todo.todo}</span>
      )}

      <div>
        <span
          className='icon'
          onClick={() => (!edit && !todo.isDone ? handleEdit(todo.id) : null)}
          role='button'
          tabIndex={0}
          aria-label='Edit todo'
        >
          <EditIcon />
        </span>

        <span className='icon' onClick={() => handleDelete(todo.id)} role='button' tabIndex={0} aria-label='Delete todo'>
          <DeleteIcon />
        </span>

        <span className='icon' onClick={() => handleDone(todo.id)} role='button' tabIndex={0} aria-label='Toggle done'>
          <DoneIcon />
        </span>

        {edit && (
          <span className='icon' onClick={handleSave} role='button' tabIndex={0} aria-label='Save todo'>
            <SaveIcon />
          </span>
        )}
      </div>
    </div>
  )
}

export default SingleTodo
