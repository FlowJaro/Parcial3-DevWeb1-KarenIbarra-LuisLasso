import { Router } from "express";
import {
  listIngredients,
  createIngredient
} from "../controllers/ingredients.controller";

const router = Router();

// Listar ingredientes
router.get("/", listIngredients);

// Crear ingrediente
router.post("/", createIngredient);

export default router;
