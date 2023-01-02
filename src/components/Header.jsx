import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "../store/auth/thunks";
import MenuDropdown from "./MenuDropdown";

const Header = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(startLogout());
  };
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="justify-between flex">
        <Link to="/">
          <h1 className="text-2xl font-black">Drivers Manager</h1>
        </Link>
        {window.innerWidth < 400 ? (
          <MenuDropdown />
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/travels" className="font-bold">
              Travels
            </Link>
            <Link to="/platforms" className="font-bold">
              Platforms
            </Link>
            <Link to="/vehicles" className="font-bold">
              Vehicles
            </Link>
            <button
              onClick={handleClick}
              className="text-white text-sm bg-gray-400 p-2 rounded-md font-bold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
