import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalPlatformConfirm from "../components/ModalPlatformConfirm";
import ModalPlatformForm from "../components/ModalPlatformForm";
import ModalTravelForm from "../components/ModalTravelForm";
import Spinner from "../components/Spinner";
import TravelList from "../components/TravelList";
import { onModalDelete, onModalForm } from "../store/platform/platformSlice";
import { onModalForm as onModalFormTravel } from "../store/travel/travelSlice";
import { viewPlatform, viewPlatforms } from "../store/platform/thunks";
import { viewTravels } from "../store/travel/thunks";
import { viewVehicles } from "../store/vehicle/thunks";
import Pagination from "../components/Pagination";

const Platform = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { platform, loading } = useSelector((state) => state.platform);
  const { travels: travelsPlatform } = useSelector((state) => state.travel);
  const { page, travelPerPage } = useSelector((state) => state.filter);

  const indexPage = page * travelPerPage;
  const indexLastPage = indexPage - travelPerPage;

  useEffect(() => {
    dispatch(viewPlatform(id));
  }, [travelsPlatform?.length]);

  const handleClick = () => {
    dispatch(onModalForm());
  };

  const handleDelete = () => {
    dispatch(onModalDelete());
  };

  const handleModalTravel = () => {
    dispatch(onModalFormTravel());
    dispatch(viewPlatforms());
    dispatch(viewVehicles());
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="bg-white shadow rounded container m-auto">
      <div className="border-b p-5 flex justify-between">
        <div className="flex items-center md:gap-2 gap-4">
          <h2 className="text-2xl font-bold ">{platform.name}</h2>
          <button type="button" onClick={handleClick}>
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button type="button" onClick={handleDelete}>
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <ModalPlatformForm />
          <ModalPlatformConfirm />
        </div>

        <button
          type="button"
          onClick={handleModalTravel}
          className="font-bold border border-black md:py-2 py-1 px-3 md:px-3 rounded-full md:rounded-lg shadow bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
        >
          <span className="hidden md:flex">New Travel</span>
          <span className="md:hidden flex text-2xl">+</span>
        </button>
        <ModalTravelForm idPlatform={id} />
      </div>
      <div className="hidden md:flex border-b p-1 bg-gray-500 text-white">
        <p className="font-bold text-center w-full">Date</p>
        <p className="font-bold text-center w-full">Vehicle</p>
        <p className="font-bold text-center w-full">Hours</p>
        <p className="font-bold text-center w-full">Trips</p>
        <p className="font-bold text-center w-full">Subtotal Earnings</p>
        <p className="font-bold text-center w-full">Km</p>
        <p className="font-bold text-center w-full">Subtotal Expenses</p>
        <p className="font-bold text-center w-full">Total</p>
      </div>
      <div>
        {platform.travels?.length ? (
          platform.travels
            .slice(indexLastPage, indexPage)
            .map((travel) => <TravelList key={travel._id} travel={travel} />)
        ) : (
          <div className="text-center py-5 text-lg font-bold">
            Add a new travel
          </div>
        )}
        <Pagination />
      </div>
    </div>
  );
};

export default Platform;
