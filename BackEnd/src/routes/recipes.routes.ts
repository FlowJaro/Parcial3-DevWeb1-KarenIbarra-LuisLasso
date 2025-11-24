import { Router } from "express";
import {
  listRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  toggleFavorite
} from "../controllers/recipes.controller";

const router = Router();

router.get("/search/name", searchRecipes);

router.get("/", listRecipes);
router.get("/:id", getRecipe);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

router.patch("/:id/favorite", toggleFavorite);

export default router;

