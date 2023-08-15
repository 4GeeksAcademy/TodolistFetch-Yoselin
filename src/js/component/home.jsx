import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [total, setTotal] = useState(0);


  
  const API_URL = "https://playground.4geeks.com/apis/fake/todos/user/Yos9s876";

  const createUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([])
      });

      if (response.ok) {
        console.log("Usuario creado correctamente");
      } else {
        console.log("Error al crear el usuario");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTodos(data);
        setTotal(data.length);
      } else {
        console.log("Error al obtener los datos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      handleAddTodo();
    }
  };

  const handleAddTodo = async () => {
    const newTodo = {
      label: inputValue,
      done: false
    };

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([...todos, newTodo])
      });

      if (response.ok) {
        setTodos([...todos, newTodo]);
        setInputValue("");
        setTotal(total + 1);
      } else {
        console.log("Error al agregar la tarea");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (indexToDelete) => {
    const newTodos = [...todos];
    newTodos.splice(indexToDelete, 1);

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodos)
      });

      if (response.ok) {
        setTodos(newTodos);
        setTotal(total - 1);
      } else {
        console.log("Error al borrar la tarea");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearAll = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        setTodos([]);
        setTotal(0);
        createUser();
      } else {
        console.log("Error al limpiar las tareas");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createUser();
    fetchTodos();
  }, []);

  return (
    <div className="container w-50 mx-auto text-warning fw-light">
      <h1 className="text-center text-warning fw-light h1 display-1">todos</h1>
      <input
        type="text"
        className="form-control"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
      />
      {todos.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={index}
            >
              {todo.label}
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(index)}
              >
                <i className="fas fa-times"></i>
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="d-flex justify-content-between align-items-center it text-secondary my-3">
  <div>{total} {total === 1 ? 'item left' : 'items left'}</div>
  <button className="btn btn-warning" onClick={handleClearAll}>
    Limpiar todas las tareas
  </button>
</div>
    </div>
  );
};

export default Home;