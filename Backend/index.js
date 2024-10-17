import express from "express";
import "./db/server.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import categoriesRouter from "./routes/categoriesRouter.js";
import productsRouter from "./routes/productsRouter.js";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ROUTES
app.use("/category", categoriesRouter);
app.use("/products", productsRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
