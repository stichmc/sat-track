import World from "@/components/World";

import { Satellite, getSatelliteData } from "./services/ApiCalls";
import { useEffect } from "react";

const App = () => {
  const Satellites: Satellite[] = [];

  const fetchData = async () => {
    const data = await getSatelliteData();
    if (data) {
      data.forEach((satellite) => {
        Satellites.push(satellite);
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <div className="col-span-1 row-span-2 max-h-2">
        <table className="text-white">
          <thead>
            <tr>
              <th>Satellite ID</th>
              <th>Satellite Name</th>
              <th>Launch Date</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Altitude</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {Satellites.map((satellite) => (
              <tr key={satellite.satid}>
                <td>{satellite.satid}</td>
                <td>{satellite.satname}</td>
                <td>{satellite.launchdate}</td>
                <td>{satellite.longitude}</td>
                <td>{satellite.latitude}</td>
                <td>{satellite.altitude}</td>
                <td>{satellite.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-span-1 row-span-2">
        <World></World>
      </div>
    </div>
  );
  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <div className="col-span-1 row-span-2 max-h-2"></div>
      <div className="col-span-1 row-span-2">
        <World></World>
      </div>
    </div>
  );
};

export default App;
