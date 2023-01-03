import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/filter/thunks";

const Pagination = () => {
  const { page } = useSelector((state) => state.filter);
  const { travels } = useSelector((state) => state.travel);

  const lastPage = Math.ceil(travels.length / 5);

  const dispatch = useDispatch();

  const handlePrev = () => {
    dispatch(setPage(page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className="flex justify-center py-2 gap-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="disabled:opacity-10"
      >
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
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <p className="text-xl">{page}</p>
      <button
        onClick={handleNext}
        disabled={page === lastPage ? true : false}
        className="disabled:opacity-10"
      >
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
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
