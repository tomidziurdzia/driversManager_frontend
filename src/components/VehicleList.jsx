import { Link } from "react-router-dom";

const VehicleList = ({ vehicle }) => {
  return (
    <Link
      className="flex border-b p-2 font-bold"
      to={`/vehicle/${vehicle._id}`}
    >
      {vehicle.patent}
    </Link>
  );
};

export default VehicleList;
