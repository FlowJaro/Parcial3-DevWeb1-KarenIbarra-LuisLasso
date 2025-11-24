import { DataTypes, Model } from "sequelize";
import sequelize from "./index";
import Ingredient from "./ingredient.model";

class Recipe extends Model {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public steps!: string | null;
  public time_minutes!: number | null;
  public isFavorite!: boolean;
}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    time_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: "recipes",
    sequelize
  }
);

export default Recipe;
