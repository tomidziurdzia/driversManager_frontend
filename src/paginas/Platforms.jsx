import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalPlatformForm from "../components/ModalPlatformForm";
import PlatformList from "../components/PlatformList";
import Spinner from "../components/Spinner";
import { onModalForm } from "../store/platform/platformSlice";
import { viewPlatforms } from "../store/platform/thunks";

const Platforms = () => {
  const { platforms, loading } = useSelector((state) => state.platform);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewPlatforms());
  }, [platforms.length]);

  const handleClick = () => {
    dispatch(onModalForm());
  };

  return (
    <div className="bg-white shadow rounded container m-auto">
      <div className="border-b p-5 flex justify-between">
        <h2 className="text-2xl font-bold ">Platforms</h2>

        <button
          type="button"
          onClick={handleClick}
          className="font-bold border border-black py-2 px-3 rounded-lg shadow bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
        >
          New Platform
        </button>
        <ModalPlatformForm />
      </div>

      {loading ? (
        <div className="flex">
          <Spinner />
        </div>
      ) : platforms?.length ? (
        platforms?.map((platform) => (
          <PlatformList key={platform._id} platform={platform} />
        ))
      ) : (
        <div className="text-center py-5 text-lg font-bold">
          Add a new platform to start uploading your journeys
        </div>
      )}
    </div>
  );
};

export default Platforms;
