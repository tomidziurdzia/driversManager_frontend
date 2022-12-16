import { Route, Routes } from "react-router-dom";
import ConfirmAccount from "../paginas/ConfirmAccount";
import ForgetPassword from "../paginas/ForgetPassword";
import Login from "../paginas/Login";
import NewPassword from "../paginas/NewPassword";
import Register from "../paginas/Register";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3">
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="forget-password/:token" element={<NewPassword />} />
            <Route path="confirm/:token" element={<ConfirmAccount />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
