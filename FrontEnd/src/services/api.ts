import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export async function getRecipes() {
  const res = await api.get("/recipes");
  return res.data;
}

export async function getRecipeById(id: number) {
  const res = await api.get(`/recipes/${id}`);
  return res.data;
}

export async function createRecipe(recipe: any) {
  const res = await api.post("/recipes", recipe);
  return res.data;
}

export async function updateRecipe(id: number, recipe: any) {
  const res = await api.put(`/recipes/${id}`, recipe);
  return res.data;
}

export async function deleteRecipe(id: number) {
  const res = await api.delete(`/recipes/${id}`);
  return res.data;
}
