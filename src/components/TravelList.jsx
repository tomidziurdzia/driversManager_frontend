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
    <Link className="flex border-b p-2 font-bold" to={`/travel/${travel._id}`}>
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
  );
};

export default TravelList;
