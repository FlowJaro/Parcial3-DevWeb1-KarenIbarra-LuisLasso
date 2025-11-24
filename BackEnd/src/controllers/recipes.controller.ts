import { Request, Response } from "express";
import Recipe from "../models/recipe.model";
import Ingredient from "../models/ingredient.model";
import sequelize from "../models";

export const listRecipes = async (_req: Request, res: Response) => {
  const recipes = await Recipe.findAll({
    include: [{ model: Ingredient, as: "ingredients", through: { attributes: [] } }]
  });
  res.json(recipes);
};

export const getRecipe = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const recipe = await Recipe.findByPk(id, {
    include: [{ model: Ingredient, as: "ingredients", through: { attributes: [] } }]
  });

  if (!recipe) return res.status(404).json({ message: "Recipe not found" });

  res.json(recipe);
};

export const createRecipe = async (req: Request, res: Response) => {
  const { name, description, steps, time_minutes, ingredients } = req.body;

  const t = await sequelize.transaction();

  try {
    const recipe = await Recipe.create(
      { name, description, steps, time_minutes },
      { transaction: t }
    );

    // INGREDIENTES
    if (Array.isArray(ingredients)) {
      const insts = [];
      for (const item of ingredients) {
        const [ing] = await Ingredient.findOrCreate({
          where: { name: item.name },
          transaction: t
        });
        insts.push(ing);
      }
      await (recipe as any).setIngredients(insts, { transaction: t });
    }

    await t.commit();

    const created = await Recipe.findByPk(recipe.id, {
      include: [{ model: Ingredient, as: "ingredients", through: { attributes: [] } }]
    });

    res.status(201).json(created);

  } catch (e) {
    await t.rollback();
    res.status(500).json({ message: "Error creating recipe", error: e });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, description, steps, time_minutes, ingredients } = req.body;

  const recipe = await Recipe.findByPk(id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });

  const t = await sequelize.transaction();

  try {
    await recipe.update({ name, description, steps, time_minutes }, { transaction: t });

    if (Array.isArray(ingredients)) {
      const insts = [];
      for (const item of ingredients) {
        const [ing] = await Ingredient.findOrCreate({
          where: { name: item },
          transaction: t
        });
        insts.push(ing);
      }
      await (recipe as any).setIngredients(insts, { transaction: t });
    }

    await t.commit();

    const updated = await Recipe.findByPk(id, {
      include: [{ model: Ingredient, as: "ingredients", through: { attributes: [] } }]
    });

    res.json(updated);

  } catch (e) {
    await t.rollback();
    res.status(500).json({ message: "Error updating recipe", error: e });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const recipe = await Recipe.findByPk(id);

  if (!recipe) return res.status(404).json({ message: "Recipe not found" });

  await recipe.destroy();
  res.json({ message: "Deleted" });
};

export const searchRecipes = async (req: Request, res: Response) => {
  const name = (req.query.name as string) ?? "";

  const results = await Recipe.findAll({
    where: sequelize.where(sequelize.fn("LOWER", sequelize.col("name")), "LIKE", `%${name.toLowerCase()}%`),
    include: [{ model: Ingredient, as: "ingredients", through: { attributes: [] } }]
  });

  res.json(results);
};

export const toggleFavorite = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const recipe = await Recipe.findByPk(id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });

  recipe.isFavorite = !recipe.isFavorite;
  await recipe.save();

  res.json(recipe);
};
