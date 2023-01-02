import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../store/auth/thunks";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";

const MenuDropdown = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(startLogout());
  };
  return (
    <div className="flex">
      <Menu as="div">
        <div className="flex">
          <Menu.Button>
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute left-2 right-2 mt-8 mx-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/travels"
                    className={`${
                      active ? "bg-gray-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Travels
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/platforms"
                    className={`${
                      active ? "bg-gray-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Platforms
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/vehicles"
                    className={`${
                      active ? "bg-gray-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Vehicles
                  </Link>
                )}
              </Menu.Item>
              <hr />
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleClick}
                    className={`${
                      active ? "bg-gray-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm mt-2`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MenuDropdown;
