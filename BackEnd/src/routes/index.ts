import { Router } from "express";
import recipesRoutes from "./recipes.routes";
import ingredientsRoutes from "./ingredients.routes";

const router = Router();

router.use("/recipes", recipesRoutes);
router.use("/ingredients", ingredientsRoutes);

export default router;
