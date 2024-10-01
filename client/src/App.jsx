import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { useEffect, useState } from "react";
import { getLogedInUser } from "./api";
import { useDispatch } from "react-redux";
import { login } from "./features/auth/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getLogedInUser()
      .then((response) => {
        dispatch(login(response.data));
      })
      .catch((error) => {
        console.log("🚀 ~ App.js ~ error:", error);
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
