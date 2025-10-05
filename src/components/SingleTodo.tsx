import React from 'react'
import { Todo } from './model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import './styles.css'

type Props = {
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const EditIcon = AiFillEdit as React.ComponentType<any>
const DeleteIcon = AiFillDelete as React.ComponentType<any>
const DoneIcon = IoCheckmarkDoneCircle as React.ComponentType<any>

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  return (
    <form className='todos__single'>
      <span className='todos__single--text'>{todo.todo}</span>
      <div>
        <span className='icon'><EditIcon /></span>
        <span className='icon'><DeleteIcon /></span>
        <span className='icon'><DoneIcon /></span>
      </div>
    </form>
  )
}

export default SingleTodo
