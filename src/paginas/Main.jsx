import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreviewPlatform from "../components/PreviewPlatform";
import PreviewVehicle from "../components/PreviewVehicle";
import { viewPlatforms } from "../store/platform/thunks";
import { viewVehicles } from "../store/vehicle/thunks";

const Main = () => {
  const { platforms } = useSelector((state) => state.platform);
  const { vehicles } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewPlatforms());
    dispatch(viewVehicles());
  }, []);

  return (
    <>
      <p className="text-center text-bold text-2xl mb-5">Platforms</p>
      {platforms.length === 0 ? (
        <div className="bg-white shadow rounded container w-4/5 m-auto text-center font-bold p-3">
          <p>You don't have any platform</p>
        </div>
      ) : (
        <div className="flex-col md:flex-row flex container m-auto justify-between">
          {platforms.map((platform) => (
            <PreviewPlatform platform={platform} key={platform._id} />
          ))}
        </div>
      )}

      <p className="text-center text-bold text-2xl mb-5">Vehicles</p>

      {vehicles.length === 0 ? (
        <div className="bg-white shadow rounded container w-4/5 m-auto text-center font-bold p-3">
          <p>You don't have any vehicle</p>
        </div>
      ) : (
        <div className="flex container mx-auto justify-between">
          {vehicles.map((vehicle) => (
            <PreviewVehicle vehicle={vehicle} key={vehicle._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Main;
