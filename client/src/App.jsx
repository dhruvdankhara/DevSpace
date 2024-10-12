import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { useEffect, useState } from "react";
import { getLogedInUser } from "./api";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/auth/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getLogedInUser()
      .then((response) => {
        if (response.status) {
          dispatch(login(response.data));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("🚀 ~ App.js ~ check Auth error:", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : null;
}

export default App;
