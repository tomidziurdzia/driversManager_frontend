import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [alert, setAlert] = useState({});
  const [formSubmit, setFormSubmit] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const { name, surname, email, password } = register;
    e.preventDefault();

    // Verifico campos vacios
    if (Object.values(register).includes("")) {
      setAlert({ msg: "All fields are required", error: true });
      return;
    }

    // Verifico que conincidan los password
    if (register.password !== register.repeatPassword) {
      setAlert({ msg: "Passwords do not match", error: true });
      return;
    }

    // Creo el usuario y lo guardo en la API
    try {
      const { data } = await clientAxios.post(`/users`, {
        name,
        surname,
        password,
        email,
      });
      setAlert({ msg: data.msg, error: false });

      setRegister({
        name: "",
        surname: "",
        email: "",
        password: "",
        repeatPassword: "",
      });

      setFormSubmit(false);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="font-black text-3xl text-center">Create Account</h1>
      {msg && <Alert alert={alert} />}
      {formSubmit && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label htmlFor="name" className="text-gray-600 block font-bold">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              id="name"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              name="name"
              value={register.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-5">
            <label htmlFor="surname" className="text-gray-600 block font-bold">
              Surname
            </label>
            <input
              type="text"
              placeholder="Enter your surname"
              id="surname"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              name="surname"
              value={register.surname}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label htmlFor="email" className="text-gray-600 block font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              id="email"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              name="email"
              value={register.email}
              onChange={handleChange}
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
              name="password"
              value={register.password}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="repeatPassword"
              className="text-gray-600 block font-bold"
            >
              Repeat Password
            </label>
            <input
              type="password"
              placeholder="Repeat password"
              id="repeatPassword"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              name="repeatPassword"
              value={register.repeatPassword}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="bg-black text-white border-2 border-black py-3 w-full rounded hover:cursor-pointer hover:bg-white hover:text-black font-bold text-xl transition-colors"
          />
        </form>
      )}
      <nav>
        <Link to="/" className="block text-center my-5 text-gray-600 text-sm">
          Already have an account? Sign in
        </Link>
      </nav>
    </>
  );
};

export default Register;
