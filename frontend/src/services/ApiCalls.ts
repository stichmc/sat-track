import axios from "axios";
const API_URL = "https://corsproxy.io/?https://api.n2yo.com/rest/v1/satellite/";
const BACKEND_URL = "http://localhost:4000/";
const API_KEY = import.meta.env.VITE_API_KEY;

interface Positions {
  satlatitude: number;
  satlongitude: number;
}

export interface APIResponse {
  name: string;
  id: number;
  positions: Array<Positions>;
  height: number;
}

export interface Satellite {
  satid: number;
  satname: string;
  launchdate: string;
  longitude: string;
  latitude: string;
  altitude: number;
  time: number;
}

const getSatellitePosition = async (id: number, count: number) => {
  const latitude = 40.0074;
  const longitude = -105.26633;
  const elevation = 1655;
  try {
    const url = `${API_URL}/positions/${id}/${latitude}/${longitude}/${elevation}/${count}/?apiKey=${API_KEY}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const name: string = response.data.info.satname;
      const id: number = response.data.info.satid;
      const positions: Array<Positions> = response.data.positions;
      const height: number = 6371 + 400; // Earth's radius + estimate

      const responseData: APIResponse = { name, id, positions, height };
      return responseData;
    } else {
      const responseData: APIResponse = { name: "", id: -1, positions: [], height: -1 };
      return responseData;
    }
  } catch (error: any) {
    if (!error.response) {
      const responseData: APIResponse = { name: "", id: -1, positions: [], height: -1 };
      return responseData;
    } else {
      const responseData: APIResponse = { name: "", id: -1, positions: [], height: -1 };
      return responseData;
    }
  }
};

const getSatelliteData = async () => {
  try {
    const url = BACKEND_URL + "satellite";
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error: any) {
    console.error(error);
  }
};

const updateSatelliteData = async (id: Number) => {
  try {
    const url = BACKEND_URL + "search";
    const response = await axios.post(url, { id });

    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error: any) {
    console.error(error);
  }
};

export { getSatellitePosition, getSatelliteData, updateSatelliteData };
