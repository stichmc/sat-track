import { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import Globe, { GlobeMethods } from "react-globe.gl";
import * as satellite from "satellite.js";

interface SatData {
  satrec: satellite.SatRec;
  name: string;
  lat?: number;
  lng?: number;
  alt?: number;
}

const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 200; // km
const TIME_STEP = 2 * 1000; // per frame

const World = () => {
  const globeEl = useRef<GlobeMethods>();
  const [satData, setSatData] = useState<SatData[]>();
  const [globeRadius, setGlobeRadius] = useState<number>();
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    // time ticker
    (function frameTicker() {
      requestAnimationFrame(frameTicker);
      setTime((time) => new Date(+time + TIME_STEP));
    })();

    // load satellite data
    fetch("//unpkg.com/globe.gl/example/datasets/space-track-leo.txt")
      .then((r) => r.text())
      .then((tleData) => {
        const satData = tleData
          .replace(/\r/g, "")
          .split(/\n(?=[^12])/)
          .filter((d) => d)
          .map((tle) => tle.split("\n"))
          .map(([name, ...tle]) => ({
            // @ts-ignore
            satrec: satellite.twoline2satrec(...tle) as satellite.SatRec,
            name: name.trim().replace(/^0 /, ""),
          }))
          // exclude those that can't be propagated
          .filter((d) => !!satellite.propagate(d.satrec, new Date()).position)
          .slice(0, 20);

        setSatData(satData);
      });
  }, []);

  const objectsData = useMemo(() => {
    if (!satData) return [];

    // Update satellite positions
    const gmst = satellite.gstime(time);
    return satData.map((d) => {
      const eci = satellite.propagate(d.satrec, time);
      if (eci.position) {
        // @ts-ignore
        const gdPos = satellite.eciToGeodetic(eci.position, gmst);
        // @ts-ignore
        const lat = satellite.radiansToDegrees(gdPos.latitude);
        // @ts-ignore
        const lng = satellite.radiansToDegrees(gdPos.longitude);
        const alt = gdPos.height / EARTH_RADIUS_KM;
        return { ...d, lat, lng, alt };
      }
      return d;
    });
  }, [satData, time]);

  const satObject = useMemo(() => {
    if (!globeRadius) return undefined;

    const satGeometry = new THREE.OctahedronGeometry((SAT_SIZE * globeRadius) / EARTH_RADIUS_KM / 2, 0);
    const satMaterial = new THREE.MeshLambertMaterial({ color: "palegreen", transparent: true, opacity: 0.7 });
    return new THREE.Mesh(satGeometry, satMaterial);
  }, [globeRadius]);

  useEffect(() => {
    setGlobeRadius(globeEl.current?.getGlobeRadius());
    globeEl.current?.pointOfView({ altitude: 3.5 });
  }, []);

  return (
    <div>
      <Globe
        width={window.innerWidth / 2}
        height={window.innerHeight}
        ref={globeEl}
        globeImageUrl="/earth-blue-marble.jpg"
        objectsData={objectsData}
        objectLabel="name"
        objectLat="lat"
        objectLng="lng"
        objectAltitude="alt"
        // @ts-ignore
        objectFacesSurface={false}
        objectThreeObject={satObject}
        backgroundColor="black"
      />
    </div>
  );
};

export default World;
