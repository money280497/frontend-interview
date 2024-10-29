import apolloLogo from "./assets/apollo-logo.jpeg";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState<any>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const addToDo = () => {
    if (newTodo.trim() === "") return
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  }
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      addToDo();
    }
  }
  const handleAllClick = () => {
    setFilter("all")
  }
  const handleActiveClick = () => {
    setFilter("active")
  }
  const handleCompletedClick = () => {
    setFilter("completed")
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const toggleComplete = (id: any) => {
    setTodos(todos.map((todo) =>
      todo?.id === id ? { ...todo, completed: !todo?.completed } : todo))
  }
  const filteredTodos = todos.filter((todo)=>{
    if(filter === "active") return !todo.completed;
    if(filter === "completed") return todo.completed;
    return true
  })
  return (
    <div className={styles.root}>
      <h1>ToDo</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e?.target?.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your list item"
        />
      </div>
        <ul className="list-items">
          {filteredTodos.map((todo) => (
            <li
              key={todo?.id}
              className="list"
            >
              <input type="checkbox" className=""
                checked={todo?.completed}
                onChange={() => toggleComplete(todo?.id)} />
              <span className="">{todo?.text}</span>
              <span className="" onClick={() => deleteTodo(todo?.id)}>X</span>
            </li>
          ))}
        </ul>
          <div>
            <span>{todos.filter((todo)=>!todo.completed).length} items left</span>
            <button onClick={handleAllClick}> All</button>
            <button onClick={handleActiveClick}> Active</button>
            <button onClick={handleCompletedClick}> Completed</button>
          </div>
    </div>
  );
}

export default App;
