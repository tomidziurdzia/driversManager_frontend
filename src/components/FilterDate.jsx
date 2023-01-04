import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { viewTravels } from "../store/travel/thunks";
import { filterTravelsDates } from "../store/travel/travelSlice";

const FilterDate = () => {
  const dispatch = useDispatch();
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");

  useEffect(() => {
    dispatch(viewTravels());
  }, []);

  const handleClick = () => {
    dispatch(filterTravelsDates({ from, until }));
  };

  return (
    <div className="flex flex-col md:flex-row m-auto md:m-0 gap-4">
      <div className="flex justify-between gap-4 items-center">
        <label htmlFor="from">From</label>
        <input
          className="border p-1"
          type="date"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
      <div className="flex justify-between gap-4 items-center">
        <label htmlFor="until">Until</label>
        <input
          className="border p-1"
          type="date"
          value={until}
          onChange={(e) => setUntil(e.target.value)}
        />
      </div>
      <button
        onClick={handleClick}
        className="border border-black px-1 rounded-lg shadow bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
      >
        Filter
      </button>
    </div>
  );
};

export default FilterDate;
