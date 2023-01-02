import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { formatearCantidad } from "../helpers/formatearCantidad";

const PreviewPlatform = ({ platform }) => {
  const netFare = platform.travels
    .map((travel) => travel.netFare)
    .reduce((total, net) => net + total, 0);

  const tips = platform.travels
    .map((travel) => travel.tips)
    .reduce((total, tip) => tip + total, 0);

  const promotions = platform.travels
    .map((travel) => travel.promotions)
    .reduce((total, pro) => pro + total, 0);

  const km = platform.travels
    .map((travel) => travel.km)
    .reduce((total, km) => km + total, 0);

  const arrKm = platform.travels.map((travel) => travel.km);
  const arrConsume = platform.travels.map((travel) => travel.vehicle.consume);

  const result = arrKm.map((total, sum) => (total * arrConsume[sum]) / 100);
  const liters = result.reduce((total, sum) => sum + total, 0);

  const priceLt = platform.travels.map((travel) => travel.priceLiter);

  const totalExpenseLt = result
    .map((total, sum) => total * priceLt[sum])
    .reduce((total, sum) => total + sum, 0);

  const totalEarnings = netFare + tips + promotions;

  return (
    <div className="bg-white shadow rounded m-auto flex-1 mx-6 h-auto mb-4 md:mb-0">
      <Link
        to={`/platform/${platform._id}`}
        className="font-bold text-xl text-center border-b-2 p-2 w-full flex justify-between md:justify-center"
      >
        <p>{platform.name}</p>
        <span className="md:hidden font-bold text-lg">
          Total: {formatearCantidad(totalEarnings - totalExpenseLt)}
        </span>
      </Link>
      <div className="flex p-2 gap-3 md:justify-center justify-between">
        <div>
          <p className="font-bold mt-4">Total KM:</p>
          <p className="font-bold mt-4">Total Liters:</p>
          <p className="font-bold mt-8">Subtotal Earnings:</p>
          <p className="font-bold mt-4">Subtotal Expenses:</p>
        </div>
        <div className="text-right">
          <p className="font-bold mt-4">{km} Km</p>
          <p className="font-bold mt-4">{liters.toFixed(2)} Lt</p>

          <p className="font-bold mt-8">{formatearCantidad(totalEarnings)}</p>
          <p className="font-bold mt-4">{formatearCantidad(totalExpenseLt)}</p>
        </div>
      </div>

      <div className="p-4 border-t-4 text-center hidden md:block">
        <p className="font-bold text-xl">
          Total: {formatearCantidad(totalEarnings - totalExpenseLt)}
        </p>
      </div>
    </div>
  );
};

export default PreviewPlatform;
