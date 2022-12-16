import { useState } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setAlert({ msg: "Email is required", error: true });
      return;
    }

    try {
      const { data } = await clientAxios.post(`/users/forget-password`, {
        email,
      });

      setAlert({ msg: data.msg, error: false });
      setEmail("");
    } catch (error) {
      setAlert({
        msg: data.msg,
        error: false,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="font-black text-3xl text-center">
        Recover your access and manage your trips
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

        <input
          type="submit"
          value="Send Instructions"
          className="bg-black text-white border-2 border-black py-3 w-full rounded hover:cursor-pointer hover:bg-white hover:text-black font-bold text-xl transition-colors"
        />
      </form>
      <nav>
        <Link to="/" className="block text-center my-5 text-gray-600 text-sm">
          Already have an account? Sign in
        </Link>
        <Link
          to="/auth/register"
          className="block text-center my-5 text-gray-600 text-sm"
        >
          Don't have an account? Register
        </Link>
      </nav>
    </>
  );
};

export default ForgetPassword;
