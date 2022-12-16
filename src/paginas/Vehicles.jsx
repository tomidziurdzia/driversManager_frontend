import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalVehicleForm from "../components/ModalVehicleForm";
import Spinner from "../components/Spinner";
import VehicleList from "../components/VehicleList";
import { viewVehicles } from "../store/vehicle/thunks";
import { onModalForm } from "../store/vehicle/vehicleSlice";

const Vehicles = () => {
  const { vehicles, loading } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewVehicles());
  }, [vehicles.length]);

  const handleClick = () => {
    dispatch(onModalForm());
  };

  return (
    <div className="bg-white shadow rounded container m-auto">
      <div className="border-b p-5 flex justify-between">
        <h2 className="text-2xl font-bold ">Vehicles</h2>

        <button
          type="button"
          onClick={handleClick}
          className="nt-bold border border-black py-2 px-3 rounded-lg shadow bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
        >
          New Vehicle
        </button>
        <ModalVehicleForm />
      </div>

      {loading ? (
        <div className="flex">
          <Spinner />
        </div>
      ) : vehicles?.length ? (
        vehicles?.map((vehicle) => (
          <VehicleList key={vehicle._id} vehicle={vehicle} />
        ))
      ) : (
        <div className="text-center py-5 text-lg font-bold">
          Add a new vehicle to start uploading your journeys
        </div>
      )}
    </div>
  );
};

export default Vehicles;
