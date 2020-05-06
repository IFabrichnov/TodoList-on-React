import React from 'react';
import TodoList from "./Todo/TodoList";

function App() {
  const todos = [
    {id: 1, completed: false, title: 'Купть хлеб'},
    {id: 2, completed: false, title: 'Купть масло'},
    {id: 3, completed: false, title: 'Купть молоко'}
  ];

  return (
    <div className='wrapper'>
      <h1>React Tutorial</h1>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
