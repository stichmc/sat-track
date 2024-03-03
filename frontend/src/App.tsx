import World from "@/components/World";

import { Satellite, getSatelliteData } from "./services/ApiCalls";
import { useEffect, useState } from "react";

const App = () => {
  const [Satellites, setSatellites] = useState<Satellite[]>([]); // [Satellite, setSatellite

  const fetchData = async () => {
    const data = await getSatelliteData();
    if (data) {
      setSatellites(data);
    }
  };

  useEffect(() => {
    fetchData();
    console.log();
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <div className="col-span-1 row-span-2 flex flex-col justify-center items-center space-y-4">
        <div className="text-white">hi</div>
        <div className="max-h-96 overflow-y-auto bg-gray-900 rounded-2xl p-2">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satellite ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satellite Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Launch Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Longitude
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Latitude
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Altitude
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {Satellites.map((satellite) => (
                <tr key={satellite.satid}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{satellite.satid}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{satellite.satname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{satellite.launchdate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{satellite.longitude}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{satellite.latitude}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{satellite.altitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-1 row-span-2">
        <World></World>
      </div>
    </div>
  );
};

export default App;
