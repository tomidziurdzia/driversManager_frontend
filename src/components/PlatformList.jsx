import { Link } from "react-router-dom";

const PlatformList = ({ platform }) => {
  return (
    <Link
      className="flex border-b p-2 font-bold"
      to={`/platform/${platform._id}`}
    >
      {platform.name}
    </Link>
  );
};

export default PlatformList;
