import World from "@/components/World";

import { Satellite, getSatelliteData, updateSatelliteData } from "./services/ApiCalls";
import { useEffect, useState } from "react";

const App = () => {
  const [Satellites, setSatellites] = useState<Satellite[]>([]); // [Satellite, setSatellite
  const [id, setId] = useState<number>(0); // [id, setId] = useState<number>(0)
  const [success, setSuccess] = useState<boolean>(false); // [success, setSuccess] = useState<boolean>(false)

  const fetchData = async () => {
    const data = await getSatelliteData();
    if (data) {
      setSatellites(data);
    }
  };

  const onClick = async () => {
    const newSatellite: Satellite = await updateSatelliteData(id);
    setSatellites([...Satellites, newSatellite]);
    setSuccess(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(event.target.value));
  };

  const refreshWindow = () => {
    window.location.reload();
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <div className="col-span-1 row-span-2 flex flex-col justify-center items-center space-y-4 p-8">
        <div className="bg-gray-900 rounded-2xl p-2">
          <div className="text-gray-300 bg-gray-900 rounded-2xl p-2 text-lg">
            Our satellite tracking website aims to provide real-time information and comprehensive data on satellites
            orbiting the Earth. The table below displays popular satellites including their launch date and orbital
            parameters. Users can add satellites to this table by entering a satellite's{" "}
            <a
              href="https://www.n2yo.com/satellites/?c=most-popular"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Norad ID.
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              className=" px-2 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Satellite Id"
              onChange={onInputChange}
            ></input>
            <button
              className="p-2 bg-gray-800 text-gray-300 rounded-md transition-transform transform hover:scale-105"
              onClick={onClick}
            >
              Add New Satellite Tracker To Database
            </button>
            {success && (
              <button
                className="p-2 bg-gray-800 text-gray-300 rounded-md transition-transform transform hover:scale-105"
                onClick={refreshWindow}
              >
                Successfully added new satellite! Refresh?
              </button>
            )}
          </div>
          <br />
          <div className="max-h-96 h-96 overflow-y-auto bg-gray-900 rounded-2xl p-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-</table>3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Satellite ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Satellite Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Launch Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Longitude
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Latitude
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Altitude
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {Satellites.map((satellite) => (
                  <tr key={satellite.satid}>
                    <td className="px-6 py-4 whitespace-nowra</th>p text-sm text-gray-300">{satellite.satid}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{satellite.satname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{satellite.launchdate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{satellite.longitude}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{satellite.latitude}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{satellite.altitude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-2">
        <World></World>
      </div>
    </div>
  );
};

export default App;
