import { useEffect, useState } from 'react';
import { getSatellitePosition, APIResponse } from '../services/ApiCalls'

function MappingData() {
  const [all, setAll] = useState<APIResponse>()
  useEffect(() => {
        getSatellitePosition(25544, 300)
        .then((response) => {
            setAll(response)
        })
    }, [])
  
  return (
    <>
      <div>
        Name: {all?.name}
        <br/>
        ID: {all?.id}
        <br/>
        Latitude Now: {all?.positions[0].satlatitude}
        <br/>
        Longitude Now: {all?.positions[0].satlongitude}
        <br/>
        Spherical Coordinates Now: ({all?.height}, {all?.positions[0].satlongitude}°, {all?.positions[0].satlatitude}°)
      </div>
    </>
  );
}

export default MappingData;
