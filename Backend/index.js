import express from "express";
import "./db/server.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js";
import ordersRouter from "./routes/orderRouter.js";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/categoryRouter.js";

const app = express();
const PORT = 3001;

const allowedOrigin = [process.env.FRONTEND_URL, process.env.DEPLOYMENT_URL];

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/auth", authRouter);

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/categories", categoryRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
