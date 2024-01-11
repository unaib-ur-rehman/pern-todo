"use client";
import { useState } from "react";
import * as api from '../api';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes);
    } catch (err) {
      console.log(err);
    }
  };

  return <main className="container mx-auto px-4"></main>;
}
