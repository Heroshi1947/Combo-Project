import React, { useState, useEffect } from 'react';
import './app.css';


function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { title: newTodo, status: 'pending' }]);
      setNewTodo('');
    }
  };

  const handleStatusToggle = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status =
      updatedTodos[index].status === 'pending' ? 'completed' : 'pending';
    setTodos(updatedTodos);
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div id='main'>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="description"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Todo</button>
      </form>
      <div id='content'>
        <ul>
          {todos.map((todo, index) => (
            <>
              <li key={index}>

                <span> <input id='check'
                  type="checkbox"
                  checked={todo.status === 'completed'}
                  onChange={() => handleStatusToggle(index)}
                />{index + 1}. </span>
                <p> {todo.title} </p>


                <button id='status' onClick={() => handleStatusToggle(index)}>
                  {todo.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}

                </button>
                <button id='remove' onClick={() => handleRemoveTodo(index)}>Remove</button>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;