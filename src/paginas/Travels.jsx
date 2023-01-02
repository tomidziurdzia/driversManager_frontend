import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalTravelForm from "../components/ModalTravelForm";
import Spinner from "../components/Spinner";
import TravelList from "../components/TravelList";
import { viewPlatforms } from "../store/platform/thunks";
import { viewTravels } from "../store/travel/thunks";
import { onModalForm } from "../store/travel/travelSlice";
import { viewVehicles } from "../store/vehicle/thunks";

const Travels = () => {
  const { travels, loading } = useSelector((state) => state.travel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewTravels());
  }, [travels.length]);

  const handleClick = () => {
    dispatch(onModalForm());
    dispatch(viewPlatforms());
    dispatch(viewVehicles());
  };
  return (
    <div className="bg-white shadow rounded container m-auto">
      <div className="border-b p-5 flex justify-between">
        <h2 className="text-2xl font-bold ">Travels</h2>

        <button
          type="button"
          onClick={handleClick}
          className="nt-bold border border-black py-2 px-3 rounded-lg shadow bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
        >
          New
        </button>
        <ModalTravelForm />
      </div>

      <>
        <div className="hidden sm:flex border-b p-1 bg-gray-500 text-white">
          <p className="font-bold text-center w-full">Date</p>
          <p className="font-bold text-center w-full">Platform</p>
          <p className="font-bold text-center w-full">Vehicle</p>
          <p className="font-bold text-center w-full">Hours</p>
          <p className="font-bold text-center w-full">Trips</p>
          <p className="font-bold text-center w-full">Subtotal Earnings</p>
          <p className="font-bold text-center w-full">Km</p>
          <p className="font-bold text-center w-full">Subtotal Expenses</p>
          <p className="font-bold text-center w-full">Total</p>
        </div>
        {travels?.length ? (
          travels.map((travel) => (
            <TravelList key={travel._id} travel={travel} />
          ))
        ) : (
          <div className="text-center py-5 text-lg font-bold">
            Add a new travel
          </div>
        )}
      </>
    </div>
  );
};

export default Travels;
