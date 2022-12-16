import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreviewPlatform from "../components/PreviewPlatform";
import { viewPlatforms } from "../store/platform/thunks";

const Main = () => {
  const { platforms } = useSelector((state) => state.platform);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewPlatforms());
  }, []);

  return (
    <div className="flex container m-auto justify-between">
      {platforms.map((platform) => (
        <PreviewPlatform platform={platform} key={platform._id} />
      ))}
    </div>
  );
};

export default Main;
