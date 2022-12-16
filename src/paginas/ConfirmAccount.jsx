import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const params = useParams();
  const { token } = params;

  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${token}`;
        const { data } = await clientAxios(url);

        setConfirmedAccount(true);
        setAlert({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };

    setLoading(false);
    confirmAccount();
  }, []);

  return (
    <>
      <h1 className="font-black text-3xl text-center">
        Confirm your account and manage your trips
      </h1>
      <div className="my-10 bg-white shadow rounded-lg p-10">
        {!loading && <Alert alert={alert} />}
        {confirmedAccount && (
          <div className="flex justify-center">
            <Link
              to="/"
              className="bg-white text-black text-center border-2 border-black py-3 w-1/3 rounded hover:cursor-pointer hover:bg-black hover:text-white font-bold  transition-colors"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
