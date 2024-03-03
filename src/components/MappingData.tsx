import { useEffect, useState } from 'react';
import ApiCalls, { APIResponse } from '../services/ApiCalls'

function MappingData() {
  const [all, setAll] = useState<APIResponse>()
  useEffect(() => {
    ApiCalls
        .getSatellitePosition(25544, 1)
        .then(response => {
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
        Latitude Now: {all?.phi}
        <br/>
        Longitude Now: {all?.theta}
        <br/>
        Spherical Coordinates Now: ({all?.height}, {all?.theta}°, {all?.phi}°)
      </div>
    </>
  );
}

export default MappingData;
