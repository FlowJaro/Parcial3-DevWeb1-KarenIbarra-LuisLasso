import Recipe from "./recipe.model";
import Ingredient from "./ingredient.model";
import sequelize from "./index";

export default function setupAssociations() {
  const RecipeIngredient = sequelize.define("RecipeIngredient", {}, { timestamps: false });

  Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, as: "ingredients" });
  Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, as: "recipes" });
}
