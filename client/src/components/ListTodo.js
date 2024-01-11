"use client";
import React, { useEffect, useState } from "react";
import UpdateTodo from "./UpdateTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
      )
    );
    setSelectedTodo(null);
  };

  const handleCancelUpdate = () => {
    setSelectedTodo(null);
  };

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      if (deleteTodo.ok) {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.todo_id !== id)
        );
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const todosList = await response.json();

      setTodos(todosList);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-center mb-4 font-bold text-gray-800 mt-7 ">
        ListTodo
      </h1>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
              <th scope="col" className="px-6 py-3">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr
                key={todo.todo_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {todo.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {selectedTodo === todo.todo_id ? (
                    <UpdateTodo
                      todo={todo}
                      onUpdate={handleUpdateTodo}
                      onCancel={handleCancelUpdate}
                    />
                  ) : (
                    <button
                      onClick={() => setSelectedTodo(todo.todo_id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListTodo;
