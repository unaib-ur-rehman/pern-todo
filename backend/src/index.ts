import express from "express";
import cors from "cors";
const port = 5000;
import * as RecipeAPI from "./recipe-api";
require('dotenv').config();

const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
  //GET http://localhost:5000/api/recipes/search?searchTerm=chicken&page=1
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);

  return res.json(results);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
