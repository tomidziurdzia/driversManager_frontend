import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { startLogin } from "../store/auth/thunks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (errorMessage) {
      setAlert({ msg: errorMessage.msg, error: errorMessage.error });
      return;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({ msg: "All fields are required", error: true });
      return;
    }

    dispatch(startLogin(email, password));
    navigate("/");
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="font-black text-3xl text-center">
        Login and manage your trips
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label htmlFor="email" className="text-gray-600 block font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
        <input
          type="submit"
          value="Login"
          className="bg-black text-white border-2 border-black py-3 w-full rounded hover:cursor-pointer hover:bg-white hover:text-black font-bold text-xl transition-colors"
        />
        <div className="mt-10 text-gray-500 ">
          <p className="flex justify-center text-2xl">User Demo</p>
          <p>Email: admin@admin.com</p>
          <p>Password: admin</p>
        </div>
      </form>
      <nav>
        <Link
          to="/auth/register"
          className="block text-center my-5 text-gray-600 text-sm"
        >
          Don't have an account? Register
        </Link>
        <Link
          to="/auth/forget-password"
          className="block text-center my-5 text-gray-600 text-sm"
        >
          Forgot my password
        </Link>
      </nav>
    </>
  );
};

export default Login;
