import axios from "axios";
import express from "express";
const satelliteRouter = express.Router();

const API_URL = `https://api.n2yo.com/rest/v1/satellite/`;
const API_KEY = process.env.API_KEY;
//@PARAMs id = satellite ID (from API),
const getSatellitePosition = async (id, count) => {
  const latitude = 40.0074;
  const longitude = -105.26633;
  const elevation = 1655;

  try {
    const url = `${API_URL}positions/${id}/${latitude}/${longitude}/${elevation}/${count}/?apiKey=${API_KEY}`;
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
    if (!error.response) {
      const responseData = { name: "", id: -1, positions: [], height: -1 };
      return responseData;
    } else {
      const responseData = { name: "", id: -1, positions: [], height: -1 };
      return responseData;
    }
  }
};

satelliteRouter.get("/:id", async (req, res) => {
  if (req.params.id) {
    res.json(await getSatellitePosition(req.params.id, 300));
    console.log("We got skibidi rizz");
  } else {
    res.status(400).json({ error: "malformatted id" });
  }
});

export { getSatellitePosition, satelliteRouter };
