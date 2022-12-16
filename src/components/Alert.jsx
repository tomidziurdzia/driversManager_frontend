const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error ? "bg-red-400" : "bg-black"
      } text-center text-white p-3 rounded-xl font-bold text-sm my-10`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
