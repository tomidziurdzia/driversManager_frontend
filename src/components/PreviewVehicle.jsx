import { Link } from "react-router-dom";

const PreviewVehicle = ({ vehicle }) => {
  const travels = vehicle.travels.map((trip) => trip.km);

  const travelsKm = travels.reduce((total, km) => km + total, 0);

  return (
    <div className="bg-white shadow rounded flex-1 md:mx-2 max-w-md h-auto mb-4 md:mb-0">
      <Link
        to={`/vehicle/${vehicle._id}`}
        className="font-bold text-xl text-center border-b-2 p-2 w-full flex justify-between md:justify-center"
      >
        {vehicle.model === "" ? <></> : <p>{vehicle.model}</p>}
        {vehicle.model === "" ? (
          <span className="font-bold text-lg">{vehicle.patent}</span>
        ) : (
          <></>
        )}
      </Link>
      <div className="flex p-2 gap-3 md:justify-center justify-between">
        <div>
          <p className="font-bold mt-4">Total KM:</p>
          <p className="font-bold mt-4">Total Trips:</p>
        </div>
        <div className="text-end">
          <p className="font-bold mt-4">{travelsKm}</p>
          <p className="font-bold mt-4">{travels.length}</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewVehicle;
