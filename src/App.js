import React, {useEffect} from 'react';
import TodoList from "./Todo/TodoList";
import Context from "./Todo/context";
import Loader from "./Loader";
import AddTodo from "./Todo/AddTodo";
import Modal from "./Modal/Modal";


function App() {
  //состояние
  const [todos, setTodos] = React.useState([]);
  //новое состояние, для того чтоб следить за Loading
  const [loading, setLoading] = React.useState(true);
  //работа с сервером
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, []);

  //функция изменения состояния чекбокса
  function toggleTodo(id) {
    setTodos(todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  //функионал по удалению определенной todo
  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  //функция для создания новой todo 
  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className='wrapper'>
        <h1>Todo Tutorial</h1>
        <Modal />

        <AddTodo onCreate={addTodo}/>

        {loading && <Loader/>}

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo}/>
        ) : (
          loading ? null : <p>No todos!</p>
        )}

      </div>
    </Context.Provider>
  );
}

export default App;
