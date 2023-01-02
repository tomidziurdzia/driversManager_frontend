import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalPlatformForm from "../components/ModalPlatformForm";
import ModalTravelForm from "../components/ModalTravelForm";
import PreviewPlatform from "../components/PreviewPlatform";
import PreviewVehicle from "../components/PreviewVehicle";
import TravelList from "../components/TravelList";
import { onModalForm as onModalFormPlatform } from "../store/platform/platformSlice";
import { onModalForm as onModalFormTravel } from "../store/travel/travelSlice";
import { onModalForm as onModalFormVehicle } from "../store/vehicle/vehicleSlice";
import { viewPlatforms } from "../store/platform/thunks";
import { viewTravels } from "../store/travel/thunks";
import { viewVehicles } from "../store/vehicle/thunks";
import ModalVehicleForm from "../components/ModalVehicleForm";

const Main = () => {
  const { platforms } = useSelector((state) => state.platform);
  const { vehicles } = useSelector((state) => state.vehicle);
  const { travels } = useSelector((state) => state.travel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewPlatforms());
    dispatch(viewVehicles());
    dispatch(viewTravels());
  }, []);

  const handleClickPlatform = () => {
    dispatch(onModalFormPlatform());
  };

  const handleClickTravel = () => {
    dispatch(onModalFormTravel());
  };

  const handleClickVehicle = () => {
    dispatch(onModalFormVehicle());
  };

  return (
    <>
      <p className="text-center text-bold text-2xl mb-5">Platforms</p>
      {platforms.length === 0 ? (
        <div className="bg-white flex justify-center items-center gap-4 shadow rounded container md:w-4/5 m-auto text-center font-bold p-3">
          <p>You don't have any platform</p>
          <button
            type="button"
            onClick={handleClickPlatform}
            className="font-bold border border-black py-2 px-3 rounded-lg shadow bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
          >
            New
          </button>
          <ModalPlatformForm />
        </div>
      ) : (
        <div className="flex-col md:flex-row flex container m-auto justify-between">
          {platforms.map((platform) => (
            <PreviewPlatform platform={platform} key={platform._id} />
          ))}
        </div>
      )}

      <p className="text-center text-bold text-2xl my-5">Vehicles</p>
      {vehicles.length === 0 ? (
        <div className="bg-white flex justify-center items-center gap-4 shadow rounded container md:w-4/5 m-auto text-center font-bold p-3">
          <p>You don't have any vehicle</p>
          <button
            type="button"
            onClick={handleClickVehicle}
            className="nt-bold border border-black py-2 px-3 rounded-lg shadow bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
          >
            New
          </button>
          <ModalVehicleForm />
        </div>
      ) : (
        <div className="flex-col md:flex-row flex container m-auto justify-between">
          {vehicles.map((vehicle) => (
            <PreviewVehicle vehicle={vehicle} key={vehicle._id} />
          ))}
        </div>
      )}

      <p className="text-center text-bold text-2xl my-5">Travels</p>
      {travels.length === 0 ? (
        <div className="bg-white flex justify-center items-center gap-4 shadow rounded container md:w-4/5 m-auto text-center font-bold p-3">
          <p>You don't have any travel</p>
          <button
            type="button"
            onClick={handleClickTravel}
            className="nt-bold border border-black py-2 px-3 rounded-lg shadow bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
          >
            New
          </button>
          <ModalTravelForm />
        </div>
      ) : (
        <>
          <div className="hidden md:flex border-b p-1 b text-black bg-white shadow rounded">
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
          <div className=" m-auto justify-between">
            {travels.map((travel) => (
              <div key={travel._id} className="bg-white shadow rounded">
                <TravelList travel={travel} key={travel._id} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Main;
