import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalVehicleConfirm from "../components/ModalVehicleConfirm";
import ModalVehicleForm from "../components/ModalVehicleForm";
import Spinner from "../components/Spinner";
import { formatearCantidad } from "../helpers/formatearCantidad";
import { formatearFecha } from "../helpers/formatearFecha";
import { viewVehicle } from "../store/vehicle/thunks";
import { onModalDelete, onModalForm } from "../store/vehicle/vehicleSlice";

const Vehicle = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { vehicle, loading } = useSelector((state) => state.vehicle);

  useEffect(() => {
    dispatch(viewVehicle(id));
  }, []);

  const handleClick = () => {
    dispatch(onModalForm());
  };

  const handleDelete = () => {
    dispatch(onModalDelete());
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="bg-white shadow rounded container m-auto">
      <div className="border-b p-5 flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold ">
            {vehicle.patent?.split(" ")[0] === "Bike" ? "Bike" : vehicle.patent}
          </h2>
          <button type="button" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button type="button" onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="font-bold border border-black py-2 px-3 rounded-lg shadow bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
        >
          New Travel
        </button>
      </div>
      <div>
        <div className="flex p-2">
          <p className="font-bold">Type:</p>
          <p>{vehicle.typeVehicle}</p>
        </div>
        {vehicle.typeVehicle !== "Bike" ? (
          <>
            <div className="flex p-2">
              <p className="font-bold">Model:</p>
              <p>{vehicle.model}</p>
            </div>
            <div className="flex p-2">
              <p className="font-bold">Expired Rego:</p>
              <p>{formatearFecha(vehicle.rego)}</p>
            </div>
          </>
        ) : (
          <></>
        )}
        {vehicle.rent === null ? (
          <></>
        ) : (
          <div className="flex p-2">
            <p className="font-bold">Rent:</p>
            <p>{formatearCantidad(vehicle.rent)}</p>
          </div>
        )}
        <div className="flex p-2">
          <p className="font-bold">Insurance:</p>
          <p>{formatearCantidad(vehicle.insurance)}</p>
        </div>
        {vehicle.typeVehicle !== "Bike" ? (
          <>
            <div className="flex p-2">
              <p className="font-bold">Consume:</p>
              <p>{vehicle.consume} Lt/100Km</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <ModalVehicleForm />
      <ModalVehicleConfirm />
    </div>
  );
};

export default Vehicle;
