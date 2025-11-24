import express from "express";
import cors from "cors";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import recipesRouter from "./routes/recipes.routes";  

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Logger de rutas
app.use((req, res, next) => {
  console.log(`➡ ${req.method} ${req.url}`);
  next();
});

// Registrar rutas de la API
app.use("/api", routes);

// Swagger
const swaggerPath = path.join(__dirname, "../openapi.yaml");
if (fs.existsSync(swaggerPath)) {
  const swaggerYaml = fs.readFileSync(swaggerPath, "utf8");
  const swaggerDoc = yaml.load(swaggerYaml) as object;
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

// Ruta base
app.get("/", (req, res) => res.send({ status: "ok" }));

// Error handler global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("🔥 Internal Server Error:", err);
  res.status(500).json({ message: "Internal server error", error: err?.message });
});

export default app;
