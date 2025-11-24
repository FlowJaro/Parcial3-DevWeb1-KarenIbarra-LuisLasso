import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Ingredient extends Model {
  public id!: number;
  public name!: string;
}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  },
  {
    tableName: "ingredients",
    sequelize
  }
);

export default Ingredient;
