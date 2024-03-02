import axios from 'axios'
const API_URL = `https://corsproxy.io/?https://api.n2yo.com/rest/v1/satellite/`;
const API_KEY = import.meta.env.VITE_API_KEY

interface InfoObject {
    satid: number;
    satname: String;
    transactionscount: number;
}

interface PositionObject {
    satlatitude: number;
    satlongitude: number;
    azimuth: number;
    elevation: number;
    ra: number;
    dec: number;
    timestamp: number;
}

export interface APIResponse {
    info: InfoObject;
    positions: Array<PositionObject>;
}

const getSatellitePosition = async (id: number, count: number) => {
    const latitude = 40.0074
    const longitude = -105.26633
    const elevation = 1655
    try {
        const url = `${API_URL}/positions/${id}/${latitude}/${longitude}/${elevation}/${count}/?apiKey=${API_KEY}`
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data
        } else {
            return false;
        }
    } catch (error: any) {
        if (!error.response) {
            return false;
        } else {
            return false;
        }
    }
};

export default { getSatellitePosition }