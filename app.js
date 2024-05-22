import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { rateLimit } from "express-rate-limit";

const app = express();

const server = createServer(app);
dotenv.config();

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*"
        : process.env.CORS_ORIGIN?.split(","),
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: function (req) {
    return req.ip;
  },
  handler: function (_, __, ___, options) {
    throw new CustomAPIError(
      `You have exceeded the ${options.windowMs}ms rate limit!`,
      this.statusCode || 500
    );
  },
});

app.use(limiter);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // serve static files


import authRouter from "./routes/auth.routes.js";

app.use("/api/v1/auth", authRouter);

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      success: 1,
    });
  } catch (error) {
    res.status(400).json({
      success: 0,
      status: 400,
    });
  }
});

export { server };
