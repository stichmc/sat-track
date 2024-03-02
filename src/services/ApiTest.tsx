import axios from 'axios'
const API_URL = `https://corsproxy.io/?https://api.n2yo.com/rest/v1/satellite/`;
const API_KEY = import.meta.env.VITE_API_KEY

const getSatellitePosition = async (id: Number) => {
    try {
        const url = `${API_URL}/positions/${id}/40.0074/-105.26633/1655/2/?apiKey=${API_KEY}`
        const response = await axios.get(url);
        if (response.status === 200) {
            console.log(response.data)
            return true;
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