import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import Loader from "./components/Loader/Loader";
import service from "./appwrite/config";
import { getPost } from "./store/postSlice";
import { getUsers } from "./store/userSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
    service.fetchPost().then((data) => {
      if (data) dispatch(getPost({ data }));
    });
    service.getUsers().then((data) => {
      if (data) dispatch(getUsers({ data }));
    });
  }, [dispatch]);
  return <>{loading ? <Loader /> : <Outlet />}</>;
}

export default App;
