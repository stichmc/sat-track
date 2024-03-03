// External Dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";


import axios from "axios";
import cron from "cron";

// import { satelliteRouter } from "./controllers/satellite.js";


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

// ****************************************
//  Update Satellite Data
// ****************************************

const updateSatData = async (id) => {
    const satData = await getSatellitePosition(id, 1);
    console.log(satData);
    const { positions, height } = satData;
    const longitude = positions[0].satlongitude;
    const latitude = positions[0].satlatitude;
    const time = positions[0].timestamp;

    // const updateQuery = `UPDATE satellite SET (longtitude, latitude, altitude, time) VALUES ($1, $2, $3, $4) WHERE satID = $5`;
    const updateQuery = `UPDATE satellite SET longtitude=$1, latitude=$2, altitude=$3, time=$4 WHERE satID = $5`;
    const values = [latitude, longitude, height, time, id];

    try {
      await db.query(updateQuery, values);
    } catch (error) {
      console.error("ERROR INSERTING DATA INTO DATABASE:", error.message || error);
    }
};

// const insertSatData = async (id) => {
//   const satData = await getSatellitePosition(id, 1);
//   console.log(satData);
//   const { name, positions, height } = satData;
//   const longitude = positions[0].satlongitude;
//   const latitude = positions[0].satlatitude;
//   const time = positions[0].timestamp;

//   const insertQuery = `INSERT INTO satellite (satName, satID, longtitude, latitude, altitude, time) VALUES ($1, $2, $3, $4, $5, $6)`;
//   const values = [name, id, latitude, longitude, height, time];

//   try {
//     await db.query(insertQuery, values);
//   } catch (error) {
//     console.error("ERROR INSERTING DATA INTO DATABASE:", error.message || error);
//   }

// };

//@PARAMs id = satellite ID (from API),  
const getSatellitePosition = async (id, count) => {
  const latitude = 40.0074;
  const longitude = -105.26633;
  const elevation = 1655;

  try {
    const url = `${API_URL}positions/${id}/${latitude}/${longitude}/${elevation}/${count}/?apiKey=${API_KEY}`;

    console.log(url);

    const response = await axios.get(url);

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
  } catch (error) {
    console.log(error)
    if (!error.response) {
      const responseData = { name: "", id: -1, positions: [], height: -1 }
      return responseData;
  } else {
      const responseData = { name: "", id: -1, positions: [], height: -1 }
      return responseData;
  }
  }
};

const cronJob = new cron.CronJob("*/5 * * * *", async () => {
  const SatIDs = [25544, 20580, 36516, 33591, 29155, 28654, 25994, 27424, 38771, 37849, 36411, 40967, 27607];

  console.log("CRON JOB STARTED");
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
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("ERROR GETTING SATELLITE DATA:", error.message || error);
    res.status(500).send("Internal Server Error");
  }
});

//Get table for satellite page
app.get("/satellite", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM satellite");
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("ERROR GETTING SATELLITE DATA:", error.message || error);
    res.status(500).send("Internal Server Error");
  }
});

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

