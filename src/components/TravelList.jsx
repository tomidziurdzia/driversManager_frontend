import { Link, useParams } from "react-router-dom";
import { formatearCantidad } from "../helpers/formatearCantidad";
import { fechaCorta } from "../helpers/formatearFecha";

const TravelList = ({ travel }) => {
  const { id } = useParams();

  const subtotalEarnings = travel.netFare + travel.promotions + travel.tips;
  const subtotalExpenses =
    ((travel.km * travel.vehicle.consume) / 100) * travel.priceLiter;
  const total = subtotalEarnings - subtotalExpenses;

  return (
    <>
      {/* Desktop */}
      <Link
        className="md:flex border-b p-2 font-bold hidden"
        to={`/travel/${travel._id}`}
      >
        {travel.vehicle.patent === undefined ? (
          <p>Cargando...</p>
        ) : (
          <>
            <p className="w-full text-center">{fechaCorta(travel.date)}</p>
            {id ? (
              <></>
            ) : (
              <p className="w-full text-center">{travel.platform?.name}</p>
            )}
            <p className="w-full text-center">
              {travel.vehicle.patent?.split(" ")[0]}
            </p>
            <p className="w-full text-center">{travel?.hours}</p>
            <p className="w-full text-center">{travel?.trips}</p>
            <p className="w-full text-center">
              {formatearCantidad(subtotalEarnings)}
            </p>
            <p className="w-full text-center">{travel.km} Km</p>
            <p className="w-full text-center">
              {formatearCantidad(subtotalExpenses)}
            </p>
            <p className="w-full text-center">{formatearCantidad(total)}</p>
          </>
        )}
      </Link>

      {/* Phone */}
      <Link
        className="flex border-b p-2 font-bold md:hidden"
        to={`/travel/${travel._id}`}
      >
        {travel.vehicle.patent === undefined ? (
          <p>Cargando...</p>
        ) : (
          <div className="flex flex-col m-auto">
            <div className="grid grid-cols-3 m-auto gap-4 text-center">
              <div>
                <p>Date</p>
                <p>{fechaCorta(travel.date)}</p>
              </div>
              <div>
                <p>Patent</p>
                <p className="w-full text-center">
                  {travel.vehicle.patent?.split(" ")[0]}
                </p>
              </div>
              <div>
                <p>Trips</p>
                <p className="w-full text-center">{travel?.trips}</p>
              </div>
            </div>
            <div
              className={`${
                travel.platform.name && "grid grid-cols-2 mt-2"
              } m-auto gap-4 text-center w-full`}
            >
              {travel.platform.name && (
                <div>
                  <p>Platform</p>
                  <p>{travel.platform.name}</p>
                </div>
              )}
              <div
                className={`${
                  !travel.platform.name && "flex mt-2 justify-center gap-4"
                }`}
              >
                <p>Total</p>
                <p>{formatearCantidad(total)}</p>
              </div>
            </div>
          </div>
        )}
      </Link>
    </>
  );
};

export default TravelList;
