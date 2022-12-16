import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { onError, onModalForm } from "../store/vehicle/vehicleSlice";
import Alert from "./Alert";
import { newVehicle, putVehicle } from "../store/vehicle/thunks";

const ModalVehicleForm = () => {
  const dispatch = useDispatch();
  const { modalForm, errorMessage, vehicle } = useSelector(
    (state) => state.vehicle
  );
  const { id } = useParams();

  const [alert, setAlert] = useState({});
  const [typeVehicle, setTypeVehicle] = useState("");
  const [patent, setPatent] = useState("");
  const [model, setModel] = useState("");
  const [rego, setRego] = useState(Date.now());
  const [consume, setConsume] = useState("");
  const [insurance, setInsurance] = useState("");
  const [rent, setRent] = useState("");

  const vehicleType = ["Car", "Bike", "Motorcycle"];

  useEffect(() => {
    if (vehicle?._id) {
      setTypeVehicle(vehicle.typeVehicle);
      setPatent(vehicle.patent);
      setModel(vehicle.model);
      setRego(vehicle.rego?.split("T")[0]);
      setConsume(vehicle.consume);
      setInsurance(vehicle.insurance);
      setRent(vehicle.rent);
      return;
    }
    setTypeVehicle("");
    setPatent("");
    setModel("");
    setRego("");
    setConsume("");
    setInsurance("");
    setRent("");
  }, [vehicle]);

  const vehicleObject = {
    typeVehicle,
    patent,
    model,
    rego,
    consume,
    insurance,
    rent,
  };

  const handleClick = () => {
    dispatch(onModalForm());
    dispatch(onError(undefined));
    setAlert({});
  };

  useEffect(() => {
    if (errorMessage) {
      setAlert({ msg: errorMessage.msg, error: errorMessage.type });
      return;
    }
  }, [errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (vehicle._id) {
      dispatch(putVehicle(vehicleObject, id));
      dispatch(onModalForm());

      setAlert({});
      return;
    }

    dispatch(newVehicle(vehicleObject));
    setAlert({});
  };

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
                    {id ? "Edit Vehicle" : "New Vehicle"}
                  </Dialog.Title>
                  {msg && <Alert alert={alert} />}
                  <form onSubmit={handleSubmit} className="my-10" action="">
                    <div className="mb-5">
                      <label htmlFor="typeVehicle">Mode of Transport</label>
                      <select
                        type="text"
                        id="typeVehicle"
                        placeholder="Vehicle model"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={typeVehicle}
                        onChange={(e) => setTypeVehicle(e.target.value)}
                      >
                        <option value="">-- Select --</option>
                        {vehicleType.map((op) => (
                          <option key={op}>{op}</option>
                        ))}
                      </select>
                    </div>

                    {typeVehicle === "Car" || typeVehicle === "Motorcycle" ? (
                      <>
                        <div className="mb-5">
                          <label htmlFor="patent">Patent</label>
                          <input
                            type="text"
                            id="patent"
                            placeholder="Vehicle patent"
                            className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                            value={patent}
                            onChange={(e) => setPatent(e.target.value)}
                          />
                        </div>

                        <div className="mb-5">
                          <label htmlFor="model">Model</label>
                          <input
                            type="text"
                            id="model"
                            placeholder="Vehicle model"
                            className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                          />
                        </div>

                        <div className="mb-5">
                          <label htmlFor="rego">Expire Rego</label>
                          <input
                            type="date"
                            id="rego"
                            className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                            value={rego}
                            onChange={(e) => setRego(e.target.value)}
                          />
                        </div>

                        <div className="mb-5">
                          <label htmlFor="consume">Consume</label>
                          <input
                            type="number"
                            id="consume"
                            placeholder="0"
                            className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                            value={consume}
                            onChange={(e) => setConsume(e.target.value)}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="mb-5">
                      <label htmlFor="insurance">Insurance</label>
                      <input
                        type="number"
                        id="insurance"
                        placeholder="0"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="rent">Rent</label>
                      <input
                        type="number"
                        id="rent"
                        placeholder="0"
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                      />
                    </div>

                    <input
                      type="submit"
                      value={id ? "Save Changes" : "Create Vehicle"}
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

export default ModalVehicleForm;
