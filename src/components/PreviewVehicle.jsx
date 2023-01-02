import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { viewTravels } from "../store/travel/thunks";

const PreviewVehicle = ({ vehicle }) => {
  const dispatch = useDispatch();
  const { travels } = useSelector((state) => state.travel);

  useEffect(() => {
    dispatch(viewTravels());
  }, []);

  const vehicleId = travels.map((vh) => vh.vehicle._id);
  console.log(vehicleId);
  console.log(vehicle);

  const resultado = vehicleId.filter((id) => id._id === vehicle._id);
  console.log(resultado);

  return (
    <div className="bg-white shadow rounded flex-1 h-auto mb-4 md:mb-0">
      <Link
        to={`/vehicle/${vehicle._id}`}
        className="font-bold text-xl text-center border-b-2 p-2 w-full flex justify-between md:justify-center"
      >
        <p>{vehicle.model}</p>
        <span className="md:hidden font-bold text-lg">{vehicle.patent}</span>
      </Link>
      <div className="flex p-2 gap-3 md:justify-center justify-between">
        <div>
          <p className="font-bold mt-4">Total KM:</p>
          <p className="font-bold mt-4">Total Trips:</p>
        </div>
        <div>
          <p className="font-bold mt-4">Total KM:</p>
          <p className="font-bold mt-4">Total Trips:</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewVehicle;
