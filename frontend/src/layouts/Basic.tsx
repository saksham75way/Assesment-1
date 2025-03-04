import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import Navbar from "../components/hompage.components/Navbar";

function Basic() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigation = useNavigate();
  React.useEffect(() => {
    if (isAuthenticated) {
      navigation("/");
    }
  }, [isAuthenticated]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Basic;
