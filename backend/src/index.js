// External Dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";

import axios from "axios";

// Declarations
const app = express();
const port = process.env.PORT;
const API_URL = `https://corsproxy.io/?https://api.n2yo.com/rest/v1/satellite/`;
const API_KEY = process.env.API_KEY;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
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

app.use(bodyParser.json());

const insertSatData = async () => {
  const response = await getSatellitePosition(25544, 1);

  // console.log(response);
};

//@PARAMs id = satellite ID (from API),  
const getSatellitePosition = async (id, count) => {
  const latitude = 40.0074;
  const longitude = -105.26633;
  const elevation = 1655;

  const url = `${API_URL}positions/${id}/${latitude}/${longitude}/${elevation}/${count}/?apiKey=${API_KEY}`;

  console.log(url);

  const response = await axios.get(url);

  console.log(response.status);
  // console.log(response.data);

  if (response.status === 200) {
    const name = response.data.info.satname;
    const id = response.data.info.satid;
    const positions = response.data.positions;
    const height = 6371 + 400; // Earth's radius + estimate
    const responseData = { name, id, positions, height };

    return responseData;
  } else {
    const responseData = { name: "", id: -1, positions: [], height: -1 };
    return responseData;
  }
};

// insertSatData();

// Broadcasting
if (port) {
  app.listen(port, () => {
    console.log(`SAT TRACK backend live on: http://localhost:${port}`);
  });
} else {
  console.log("SAT TRACK backend is not running without a PORT environment variable, shutting down.");
  process.exit();
}

