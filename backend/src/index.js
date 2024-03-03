// External Dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";

import { satelliteRouter } from "./controllers/satellite.js";

// Declarations
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const db = new pg.Client({
  host: "postgres-db",
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// Database Connection
try {
  await db.connect();
} catch (error) {
  console.error("ERROR DATABASE CONNECTION UNSUCCESSFUL:", error.message || error);
  process.exit();
}

app.use(express.json());

const insertSatData = async () => {
  const skibidiRizz = await getSatellitePosition(25544, 1);

  console.log(skibidiRizz);
};

app.use('/api/satpos', satelliteRouter)

// Broadcasting
if (port) {
  app.listen(port, () => {
    console.log(`SAT TRACK backend live on: http://localhost:${port}`);
  });
} else {
  console.log("SAT TRACK backend is not running without a PORT environment variable, shutting down.");
  process.exit();
}

