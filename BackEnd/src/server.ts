import app from "./app";
import sequelize from "./models";
import Recipe from "./models/recipe.model";
import Ingredient from "./models/ingredient.model";
import "./models/ingredient.model";
import "./models/recipe.model";

const PORT = 3000;

// 🔹 Definir relaciones
Recipe.belongsToMany(Ingredient, { through: "RecipeIngredient", as: "ingredients" });
Ingredient.belongsToMany(Recipe, { through: "RecipeIngredient", as: "recipes" });

async function start() {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected.");

    console.log("Syncing models...");
    await sequelize.sync(); 
    console.log("Models synchronized.");

    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );

  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

start();

