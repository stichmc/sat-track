// External Dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";

import axios from "axios";
import cron from "cron";

import { getSatellitePosition } from "./controllers/satellite.js";

// import { satelliteRouter } from "./controllers/satellite.js";

// Declarations
const app = express();
const port = process.env.PORT;

var SatIDs = [];
const API_URL = "https://api.n2yo.com/rest/v1/satellite/";
const API_KEY = process.env.API_KEY;

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

// ****************************************
//  Insert Satellite Data
// ****************************************

app.post("/search", async (req, res) => {
  const id = req.body.id;

  const checkExistQuery = "SELECT EXISTS (SELECT 1 FROM satellite WHERE satID = $1) AS exists;";
  let checkExistsSat = await db.query(checkExistQuery, [id]);
  if (checkExistsSat.rows[0].exists) {
    //Update existing satellite data
    console.log("Satellite already exists in database, updating data...");
  } else {
    // Insert new satellite data
    if (insertSatData(id) < 0) {
      res.status(500).send("Internal Server Error");
      return;
    }
  }

  try {
    const response = await db.query("SELECT * FROM satellite WHERE satid = $1", [id]);
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error("ERROR GETTING SATELLITE DATA:", error.message || error);
    res.status(500).send("Internal Server Error");
  }
});

//@PARAMs id = satellite ID (from API),
const insertSatData = async (id) => {
  if (id === null) {
    console.error("ERROR: INVALID SATELLITE ID");
    return -1;
  }
  if (id in SatIDs) {
    console.error("ALREADY INSERTED DATA FOR THIS SATELLITE ID: ", id);
    return -1;
  }

  const satData = await getSatellitePosition(id, 1);

  if (satData.name === "" || satData.id === -1) {
    console.error("ERROR: INVALID SATELLITE ID");
    return -1;
  }

  const { name, positions, height } = satData;
  const longitude = positions[0].satlongitude;
  const latitude = positions[0].satlatitude;
  const time = positions[0].timestamp;

  if (name === null || id === null) {
    console.error("ERROR: INVALID SATELLITE ID");
    return -1;
  }

  const insertQuery = `INSERT INTO satellite (satName, satID, longitude, latitude, altitude, time) VALUES ($1, $2, $3, $4, $5, $6)`;
  const values = [name, id, latitude, longitude, height, time];

  SatIDs.push(id);

  try {
    await db.query(insertQuery, values);
  } catch (error) {
    console.error("ERROR INSERTING DATA INTO DATABASE:", error.message || error);
    return -2;
  }
};

// ****************************************
//  Update Satellite Data
// ****************************************

const updateSatData = async (id) => {
  const satData = await getSatellitePosition(id, 1);
  const { positions, height } = satData;
  const longitude = positions[0].satlongitude;
  const latitude = positions[0].satlatitude;
  const time = positions[0].timestamp;

  // const updateQuery = `UPDATE satellite SET (longtitude, latitude, altitude, time) VALUES ($1, $2, $3, $4) WHERE satID = $5`;
  const updateQuery = `UPDATE satellite SET longitude=$1, latitude=$2, altitude=$3, time=$4 WHERE satID = $5`;
  const values = [latitude, longitude, height, time, id];

  try {
    await db.query(updateQuery, values);
  } catch (error) {
    console.error("ERROR INSERTING DATA INTO DATABASE:", error.message || error);
  }
};

//@PARAMs id = satellite ID (from API),

const cronJob = new cron.CronJob("*/5 * * * *", async () => {
  SatIDs = [25544, 20580, 36516, 33591, 29155, 28654, 25994, 27424, 38771, 37849, 36411, 40967, 27607];

  SatIDs.map((id) => {
    updateSatData(id);
  });
});
cronJob.start();

// ****************************************
//  Get Satellite Data
// ****************************************

//Get single satellite data
app.get("/satellite/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await db.query("SELECT * FROM satellite WHERE satid = $1", [id]);

    // response.launchDate = response.launchDate.substring(0, 10);
    console.log("SINGLE:", response.rows[0].launchDate);

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("ERROR GETTING SATELLITE DATA:", error.message || error);
    res.status(500).send("Internal Server Error");
  }
});

//Get table for satellite page
app.get("/satellite", async (req, res) => {
  // const satQuery = "SELECT satID, satname, SUBSTRING(launchdate, 1, 10) as launch_date, latitude, longitude, altitude FROM satellite";
  const satQuery = "SELECT * FROM satellite";
  try {
    const response = await db.query(satQuery);

    // for(row in response.rows){
    //   row.launchDate = response.rows[row].launchDate.substring(0, 10);
    // }

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("ERROR GETTING SATELLITE DATA:", error.message || error);
    res.status(500).send("Internal Server Error");
  }
});

//Udate on Startup
const updateOnStartup = async () => {
  var initialized = false;
  if (initialized === false) {
    console.log("UPDATING ON STARTUP");
    SatIDs = [25544, 20580, 36516, 33591, 29155, 28654, 25994, 27424, 38771, 37849, 36411, 40967, 27607];
    SatIDs.map((id) => {
      updateSatData(id);
    });
    initialized = true;
  }
};

updateOnStartup();

// ****************************************
//  Broadcasting
// ****************************************

// app.use('/api/satpos', satelliteRouter)

if (port) {
  app.listen(port, () => {
    console.log(`SAT TRACK backend live on: http://localhost:${port}`);
  });
} else {
  console.log("SAT TRACK backend is not running without a PORT environment variable, shutting down.");
  process.exit();
}
