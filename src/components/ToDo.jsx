import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import ToDoItems from './ToDoItems'

const ToDo = () => {

    const inputRef = useRef();
    const [todoList, setTodoList] = useState(localStorage.getItem("lists") ? JSON.parse(localStorage.getItem("lists")) : []);

    const add = () => {
        const inputText = inputRef.current.value.trim();
        
        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("lists", JSON.stringify(todoList))
    }, [todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      
    {/* ----------- title ----------- */}
    
    <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt='' />
        <h1 className='text-3xl font-semibold'>Daily To-Do List</h1>
    </div>

    {/* ----------- input field ----------- */}
    
    <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type='text' placeholder='Add to your list' />
        
        <button onClick={add} onKeyDown={e => e.key === 'Enter' ? add : ''} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>
            ADD +
        </button>
    </div>

    {/* ----------- list ----------- */}
    
    <div>
        {todoList.map((item, index) => {
            return <ToDoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
        })}

    </div>

    </div>
  )
}

export default ToDo
