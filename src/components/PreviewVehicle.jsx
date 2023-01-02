import React from "react";

const PreviewVehicle = ({ vehicle }) => {
  return (
    <div className=" bg-white shadow rounded m-auto flex-1 mx-6 h-auto">
      <p className="font-bold text-xl text-center border-b-2 py-2 w-full">
        {vehicle.patent}
      </p>
    </div>
  );
};

export default PreviewVehicle;
