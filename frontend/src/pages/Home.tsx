import World from "@/components/World";

const Home = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <div className="col-span-1 row-span-2">
        <h1 className="text-4xl font-bold text-center text-white"></h1>
      </div>
      <div className="col-span-1 row-span-2">
        <World></World>
      </div>
    </div>
  );
};

export default Home;
