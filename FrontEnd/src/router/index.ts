import { createRouter, createWebHistory } from "vue-router";

// VISTAS
import ListRecipes from "../pages/ListRecipes.vue";
import CreateRecipe from "../pages/CreateRecipe.vue";
import RecipeDetail from "../pages/RecipeDetail.vue"; // pasamos a pages si quieres como página
import RecipeForm from "../pages/RecipeForm.vue"; // ⬅ Mover RecipeForm a pages

const routes = [
  {
    path: "/",
    name: "Home",
    component: ListRecipes,
  },
  {
    path: "/recipe/:id",
    name: "RecipeDetail",
    component: RecipeDetail,
  },
  {
    path: "/crear",
    name: "CreateRecipe",
    component: CreateRecipe,
  },
  {
    path: "/edit/:id",
    name: "EditRecipe",
    component: RecipeForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
