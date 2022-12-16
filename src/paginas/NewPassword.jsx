import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [validToken, setValidToken] = useState(false);
  const [changedPassword, setChangedPassword] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await clientAxios(`/users/forget-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };

    verifyToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifico campos vacios
    if ([password, repeatPassword].includes("")) {
      setAlert({
        msg: "There are empty fields",
        error: true,
      });
      return;
    }

    // Verifico que los password coincidan
    if (password !== repeatPassword) {
      setAlert({
        msg: "The passwords do not match",
        error: true,
      });
      return;
    }

    setAlert({});

    // Guardando nuevo password
    try {
      const url = `/users/forget-password/${token}`;
      const { data } = await clientAxios.post(url, {
        password,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });

      setPassword("");
      setRepeatPassword("");
      setChangedPassword(true);

      setTimeout(() => {
        setAlert({});
      }, 2000);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <h1 className="font-black text-3xl text-center">
        Reset your password and manage your trips
      </h1>

      {msg && <Alert alert={alert} />}
      {validToken && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label htmlFor="password" className="text-gray-600 block font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="password2"
              className="text-gray-600 block font-bold"
            >
              Repeat Password
            </label>
            <input
              type="password"
              placeholder="Repeat password"
              id="password2"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Recover account"
            className="bg-black text-white border-2 border-black py-3 w-full rounded hover:cursor-pointer hover:bg-white hover:text-black font-bold text-xl transition-colors"
          />
        </form>
      )}

      {changedPassword && (
        <div className="flex justify-center">
          <Link
            className="bg-black text-white border-2 border-black py-3 w-32 rounded hover:cursor-pointer hover:bg-white hover:text-black font-bold text-sm text-center transition-colors"
            to="/"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default NewPassword;
