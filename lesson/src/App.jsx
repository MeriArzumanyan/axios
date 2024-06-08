import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/todos",
  });
  //////managing input
  const manageInput = (e) => {
    setValue(e.target.value);
  };
  /////////get request
  useEffect(() => { 
    instance.get(`/`).then((res) => setTodos(res.data));
  }, []);
  //////post request
  function addTodo() {
    instance
      .post(`/`, { title: value })
      .then((res) => setTodos([res.data, ...todos]));
    setValue("");
  }
  ////////delete request
  function removeTodo(todo) {
    instance
      .delete(`/${todo.id}`)
      .then((res) => console.log(res));
    setTodos(
      todos.filter((el) => {
        return el.id !== todo.id;
      })
    );
  }

  return (
    <div>
      <input type="text" value={value} onChange={manageInput} />
      <button onClick={addTodo}>add</button>
      {todos.map((el) => {
        return (
          <div key={el.id}>
            <p>{el.title}</p>
            <button onClick={() => removeTodo(el)}> x</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
