import { Request, Response } from "express";
import Ingredient from "../models/ingredient.model";

export const listIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching ingredients", error: err });
  }
};

export const createIngredient = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log("Incoming ingredient:", name); // LOG 1

    if (!name) return res.status(400).json({ message: "Name required" });

    const [ingredient, created] = await Ingredient.findOrCreate({
      where: { name }
    });

    console.log("Created:", created, "Ingredient:", ingredient); // LOG 2

    if (!created) {
      return res.status(409).json({ message: "Ingredient already exists" });
    }

    res.status(201).json(ingredient);
  } catch (err: any) {
    console.error("ERROR CREATE INGREDIENT:", err); // LOG 3
    res.status(500).json({ message: "Error creating ingredient", error: err });
  }
};

