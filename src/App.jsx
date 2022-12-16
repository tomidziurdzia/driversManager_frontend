import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthToken } from "./store/auth/thunks";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Spinner from "./components/Spinner";

const App = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticateToken = async () => {
      await dispatch(checkAuthToken());
    };
    authenticateToken();
  }, [checkAuthToken]);

  if (status === "checking") return <Spinner />;

  return (
    <BrowserRouter>
      <Routes>
        {status === "not-authenticated" ? (
          <>
            {/* Area Publica */}

            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        ) : (
          <>
            {/* Area Privada */}
            <Route path="/*" element={<ProtectedRoute />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
