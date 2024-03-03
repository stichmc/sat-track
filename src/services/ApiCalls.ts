import axios from "axios";
const API_URL = `https://corsproxy.io/?https://api.n2yo.com/rest/v1/satellite/`;
const API_KEY = import.meta.env.VITE_API_KEY;

export interface APIResponse {
    name: string,
    id: number,
    phi: number;
    theta: number;
    height: number;
}

const getSatellitePosition = async (id: number, count: number) => {
    const latitude = 40.0074
    const longitude = -105.26633
    const elevation = 1655
    try {
        const url = `${API_URL}/positions/${id}/${latitude}/${longitude}/${elevation}/${count}/?apiKey=${API_KEY}`
        const response = await axios.get(url);
        if (response.status === 200) {
            const name: string = response.data.info.satname
            const id: number = response.data.info.satid
            // phi = latitude
            // theta = longitude
            const phi: number = response.data.positions[0].satlatitude > 0 ?
                90 - response.data.positions[0].satlatitude :
                -90 + response.data.positions[0].satlatitude
            const theta: number = response.data.positions[0].satlongitude
            const height: number = 6371 + 400 // Earth's radius + estimate

            const responseData: APIResponse = { name, id, phi, theta, height }
            return responseData
        } else {
            const responseData: APIResponse = { name: "", id: -1, phi: -1, theta: -1, height: -1 }
            return responseData;
        }
    } catch (error: any) {
        if (!error.response) {
            const responseData: APIResponse = { name: "", id: -1, phi: -1, theta: -1, height: -1 }
            return responseData;
        } else {
            const responseData: APIResponse = { name: "", id: -1, phi: -1, theta: -1, height: -1 }
            return responseData;
        }
  }
};

export default getSatellitePosition;
