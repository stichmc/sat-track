import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex flex-col :flex-row items-center justify-center p-4">
      <Link to={`/home`}>
          <p className="text-lg font-bold">Home</p>
      </Link>
      <Link to={`/satellites`}>
          <p className="text-lg font-bold">Satellites</p>
      </Link>
      <Link to={`/custom`}>
          <p className="text-lg font-bold">Custom</p>
      </Link>
    </div>
  );
}
