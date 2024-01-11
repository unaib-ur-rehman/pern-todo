const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Contants//
const INSERT_TODO_QUERY =
  //$1 is a placeholder or variable that's going to specify this description
  //Returning * is used to return the data(updated and deleted) that was just inserted into the database
  "INSERT INTO todo (description) VALUES($1) RETURNING *"; // INSERT to enter data into the database "INTO todo" is the table name and "(description)" is the column name
const GET_ALL_TODOS_QUERY = "SELECT * FROM todo";

const GET_A_TODO_QUERY = "SELECT * FROM todo WHERE todo_id = $1";

const UPDATE_TODO_QUERY = "UPDATE todo SET description = $1 WHERE todo_id = $2";

const DELETE_TODO_QUERY = "DELETE FROM todo WHERE todo_id = $1";
//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(INSERT_TODO_QUERY, [description]);
    res.json(newTodo.rows[0]); //rows[0] is used to return the data that was just inserted into the database
  } catch (err) {
    console.error("Error inserting todo:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(GET_ALL_TODOS_QUERY);
    res.json(allTodos.rows);
  } catch (error) {
    console.error(err.message);
  }
});

//get a todo(dynamic route)
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(GET_A_TODO_QUERY, [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(UPDATE_TODO_QUERY, [description, id]);
    res.json("Todo is updated");
  } catch (error) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(DELETE_TODO_QUERY, [id]);
    res.json("Todo is deleted");
  } catch (error) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
