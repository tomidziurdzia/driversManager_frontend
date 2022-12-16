import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { onError, onModalForm } from "../store/travel/travelSlice";
import Alert from "./Alert";
import { newTravel, putTravel } from "../store/travel/thunks";
import { viewAllPlatforms } from "../store/platform/platformSlice";

const ModalTravelForm = () => {
  const dispatch = useDispatch();
  const { modalForm, errorMessage, travel } = useSelector(
    (state) => state.travel
  );

  const { platforms } = useSelector((state) => state.platform);
  const { vehicles } = useSelector((state) => state.vehicle);

  const { id } = useParams();
  const params = useParams();

  const platformActive = platforms?.filter((platform) => platform._id === id);
  const [alert, setAlert] = useState({});
  const [date, setDate] = useState("");
  const [platformSelect, setPlatformSelect] = useState(
    platformActive[0]?.name ? platformActive[0]?.name : ""
  );
  const [hours, setHours] = useState("");
  const [trips, setTrips] = useState("");
  const [netFare, setNetFare] = useState("");
  const [promotions, setPromotions] = useState("");
  const [tips, setTips] = useState("");
  const [km, setKm] = useState("");
  const [priceLiter, setPriceLiter] = useState("");
  const [vehicleUsed, setVehicleUsed] = useState("");

  useEffect(() => {
    if (travel?._id) {
      setDate(travel.date?.split("T")[0]);
      setHours(travel.hours);
      setTrips(travel.trips);
      setNetFare(travel.netFare);
      setPromotions(travel.promotions);
      setTips(travel.tips);
      setKm(travel.km);
      setPriceLiter(travel.priceLiter);

      return;
    }
    setDate("");
    setPlatformSelect("");
    setHours("");
    setTrips("");
    setNetFare("");
    setPromotions("");
    setTips("");
    setKm("");
    setPriceLiter("");
    setVehicleUsed("");
  }, [travel]);

  const travelObject = {
    date,
    platform: platformSelect,
    hours,
    trips,
    netFare,
    promotions,
    tips,
    km,
    priceLiter,
    vehicle: vehicleUsed,
  };

  const handleClick = () => {
    dispatch(onModalForm());
    dispatch(onError(undefined));
    dispatch(viewAllPlatforms([]));
    setAlert({});
    setDate("");
    setPlatformSelect("");
    setHours("");
    setTrips("");
    setNetFare("");
    setPromotions("");
    setTips("");
    setKm("");
    setPriceLiter("");
    setVehicleUsed("");
  };

  useEffect(() => {
    if (errorMessage) {
      setAlert({ msg: errorMessage.msg, error: errorMessage.type });
      return;
    }
  }, [errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      setAlert({ msg: "Date required", error: true });
      return;
    }

    if (!platformSelect) {
      setAlert({ msg: "Platform required", error: true });
      return;
    }

    if (!hours) {
      setAlert({ msg: "Hours worked required", error: true });
      return;
    }

    if (!trips) {
      setAlert({ msg: "Trips required", error: true });
      return;
    }

    if (!netFare) {
      setAlert({ msg: "Net fare required", error: true });
      return;
    }

    if (!vehicleUsed) {
      setAlert({ msg: "Vehicle required", error: true });
      return;
    }

    if (travel._id) {
      dispatch(putTravel(travelObject, id));
      setAlert({});
      setDate("");
      setPlatformSelect("");
      setHours("");
      setTrips("");
      setNetFare("");
      setPromotions("");
      setTips("");
      setKm("");
      setPriceLiter("");
      setVehicleUsed("");
      dispatch(onModalForm());

      return;
    }

    dispatch(newTravel(travelObject));

    setAlert({});
    setDate("");
    setPlatformSelect("");
    setHours("");
    setTrips("");
    setNetFare("");
    setPromotions("");
    setTips("");
    setKm("");
    setPriceLiter("");
    setVehicleUsed("");
  };

  const hoursWorked = [
    "1:00",
    "1:15",
    "1:30",
    "1:45",
    "2:00",
    "2:15",
    "2:30",
    "2:45",
    "3:00",
    "3:15",
    "3:30",
    "3:45",
    "4:00",
    "4:15",
    "4:30",
    "4:45",
    "5:00",
    "5:15",
    "5:30",
    "5:45",
    "6:00",
    "6:15",
    "6:30",
    "6:45",
    "7:00",
    "7:15",
    "7:30",
    "7:45",
    "8:00",
    "8:15",
    "8:30",
    "8:45",
    "9:00",
    "9:15",
    "9:30",
    "9:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
  ];

  const { msg } = alert;
  return (
    <Transition.Root show={modalForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClick}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleClick}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 font-bold text-gray-900 text-center"
                  >
                    {params["*"].split("/")[0] === "platform"
                      ? "New Travel"
                      : id
                      ? "Edit Travel"
                      : "New Travel"}
                  </Dialog.Title>
                  {msg && <Alert alert={alert} />}
                  <form onSubmit={handleSubmit} className="my-10" action="">
                    <div className="mb-5">
                      <label htmlFor="date">Travel Date</label>
                      <input
                        type="date"
                        id="date"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="platform">Platform</label>
                      {/* <input
                        disabled={true}
                        type="platform"
                        id="platform"
                        value={platformActive[0]?.name}
                        // onChange={(e) => setPlatformSelect(e.target.value)}
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md bg-gray-300"
                      /> */}
                      <select
                        name="platform"
                        id="platform"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={platformSelect}
                        onChange={(e) => setPlatformSelect(e.target.value)}
                      >
                        <option value="">-- Select --</option>
                        {platformActive[0]?.name ? (
                          <option
                            value={platformActive[0]?._id}
                            key={platformActive[0]?._id}
                          >
                            {platformActive[0]?.name}
                          </option>
                        ) : (
                          <>
                            {platforms.map((pl) => (
                              <option value={pl._id} key={pl._id}>
                                {pl.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="hours">Hours Worked</label>
                      <select
                        name="hours"
                        id="hours"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                      >
                        <option value="">-- Select --</option>
                        {hoursWorked.map((hs) => (
                          <option key={hs}>{hs}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="trips">Trips</label>
                      <input
                        type="number"
                        id="trips"
                        placeholder="0"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={trips}
                        onChange={(e) => setTrips(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="netFare">Net Fare</label>
                      <input
                        type="number"
                        id="netFare"
                        placeholder="0"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={netFare}
                        onChange={(e) => setNetFare(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="promotions">Promotions</label>
                      <input
                        type="number"
                        id="promotions"
                        placeholder="0"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={promotions}
                        onChange={(e) => setPromotions(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="tips">Tips</label>
                      <input
                        type="number"
                        id="tips"
                        placeholder="0"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={tips}
                        onChange={(e) => setTips(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="vehicleUsed">Vehicle</label>
                      <select
                        name="vehicleUsed"
                        id="vehicleUsed"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={vehicleUsed}
                        onChange={(e) => setVehicleUsed(e.target.value)}
                      >
                        <option value="">-- Select --</option>
                        {vehicles?.map((vh) => (
                          <option value={vh._id} key={vh._id}>
                            {vh.patent}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="km">Km</label>
                      <input
                        type="number"
                        id="km"
                        placeholder="0"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="priceLiter">Price Liter</label>
                      <input
                        type="number"
                        id="priceLiter"
                        placeholder="0"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={priceLiter}
                        onChange={(e) => setPriceLiter(e.target.value)}
                      />
                    </div>
                    <input
                      type="submit"
                      value={
                        params["*"].split("/")[0] === "platform"
                          ? "New Travel"
                          : id
                          ? "Edit Travel"
                          : "New Travel"
                      }
                      className="bg-black text-center text-white border-2 border-black py-2 w-full rounded hover:cursor-pointer hover:bg-white hover:text-black font-bold text-xl transition-colors"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalTravelForm;
