import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalTravelConfirm from "../components/ModalTravelConfirm";
import ModalTravelForm from "../components/ModalTravelForm";
import Spinner from "../components/Spinner";
import { formatearCantidad } from "../helpers/formatearCantidad";
import { fechaCorta, formatearFecha } from "../helpers/formatearFecha";
import { viewPlatforms } from "../store/platform/thunks";
import { viewTravel } from "../store/travel/thunks";
import { onModalDelete, onModalForm } from "../store/travel/travelSlice";
import { viewVehicles } from "../store/vehicle/thunks";

const Travel = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { travel, loading } = useSelector((state) => state.travel);

  const liters = Number((travel.km * travel.vehicle?.consume) / 100);

  const subtotalEarnings = travel.netFare + travel.tips + travel.promotions;
  const subtotalExpenses = liters * travel.priceLiter;
  const total = subtotalEarnings - subtotalExpenses;

  const handleClick = () => {
    dispatch(onModalForm());
    dispatch(viewVehicles());
    dispatch(viewPlatforms());
  };

  const handleDelete = () => {
    dispatch(onModalDelete());
  };

  useEffect(() => {
    dispatch(viewTravel(id));
  }, []);

  if (!travel.vehicle || !travel.platform) return <Spinner />;

  return (
    <div className="bg-white shadow rounded container m-auto">
      <div className="flex px-4">
        <div className="w-20 hidden md:flex"></div>
        <p className="font-bold text-center w-full py-2">
          Travel:{" "}
          <span className="hidden md:block">
            {formatearFecha(travel?.date)}
          </span>
          <span>{fechaCorta(travel?.date)}</span>
        </p>
        <div className="flex w-20 justify-between">
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
      </div>

      <div className="grid md:block grid-cols-2 justify-items-center w-4/5 m-auto md:w-full">
        <div className="md:flex md:flex-row md:border-b md:p-2 w-full md:bg-gray-500 md:text-white">
          <p className="font-bold mb-1 md:text-center w-full">Hours</p>
          <p className="font-bold mb-1 md:text-center w-full">Trips</p>
          <p className="font-bold mb-1 md:text-center w-full">Net Fare</p>
          <p className="font-bold mb-1 md:text-center w-full">Promotions</p>
          <p className="font-bold mb-1 md:text-center w-full">Tips</p>
        </div>

        <div className="md:flex w-2/3 md:w-full md:text-center text-end">
          <p className="w-full mb-1 md:py-2 md:text-center">{travel?.hours}</p>
          <p className="w-full mb-1 md:py-2 md:text-center">{travel?.trips}</p>
          <p className="w-full mb-1 md:py-2 md:text-center">
            {formatearCantidad(travel?.netFare)}
          </p>
          <p className="w-full md:py-2 md:text-center">
            {formatearCantidad(travel?.promotions)}
          </p>
          <p className="w-full md:py-2 md:text-center">
            {formatearCantidad(travel?.tips)}
          </p>
        </div>
      </div>

      <div className="grid md:block grid-cols-2 justify-items-center w-4/5 m-auto md:w-full">
        <div className="md:flex md:flex-row md:border-b md:p-2 w-full md:bg-gray-500 md:text-white">
          <p className="font-bold mb-1 md:text-center w-full">Vehicle</p>
          <p className="font-bold mb-1 md:text-center w-full">Platform</p>
          <p className="font-bold mb-1 md:text-center w-full">Km</p>
          <p className="font-bold mb-1 md:text-center w-full">Liters</p>
          <p className="font-bold mb-1 md:text-center w-full">Price Liter</p>
        </div>
        <div className="md:flex w-2/3 md:w-full md:text-center text-end">
          <p className="w-full mb-1 md:py-2 md:text-center">
            {travel.vehicle?.patent}
          </p>
          <p className="w-full mb-1 md:py-2 md:text-center">
            {travel.platform?.name}
          </p>
          <p className="w-full mb-1 md:py-2 md:text-center">{travel?.km}</p>
          <p className="w-full mb-1 md:py-2 md:text-center">{liters}</p>
          <p className="w-full mb-1 md:py-2 md:text-center">
            {formatearCantidad(travel?.priceLiter)}
          </p>
        </div>
      </div>
      <div className="mt-4 grid md:block border-t-4 border-gray-600 md:border-none grid-cols-2">
        <div className="md:border-t-4 border-gray-600 pt-4 pb-2 flex flex-col md:flex-row">
          <p className="font-bold py-2 text-center w-full">Subtotal Earnings</p>
          <p className="font-bold py-2 text-center w-full">Subtotal Expenses</p>
          <p className="font-bold py-2 text-center w-full">Total</p>
        </div>
        <div className="flex pb-2 pt-4 md:pt-0 flex-col md:flex-row">
          <p className="w-full pb-2 text-center font-bold">
            {formatearCantidad(subtotalEarnings)}
          </p>
          <p className="w-full py-2 text-center font-bold">
            {formatearCantidad(subtotalExpenses)}
          </p>
          <p className="w-full py-2 text-center font-bold text-xl">
            {formatearCantidad(total)}
          </p>
        </div>
      </div>
      <ModalTravelForm />
      <ModalTravelConfirm />
    </div>
  );
};

export default Travel;
