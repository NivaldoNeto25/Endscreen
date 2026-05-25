import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PASTA_PROJETO = path.join(__dirname, "..");

app.use(express.static(PASTA_PROJETO));
app.use(express.json());

app.use(routes);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000: http://localhost:5000");
});
