/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useProfile from "../../../hooks/getUserProfile";
import Loading from "../../loadding/Loading";

const Privete = ({ children }) => {
  const { data, isLoading, isError, error } = useProfile();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(data?.user);
  }, [data]);

  if (isLoading || isError || !user || !user?.email) {
    return <Loading/>;
  }

  

  // console.log(user)
  if (user && user?.email && user?.email !== "" && user?.email !== null && user?.email !== undefined && user?.name && user?.name !== "" && user?.name !== null && user?.name !== undefined && user?.photo && user?.photo !== "" && user?.photo !== null && user?.photo !== undefined) {
    // console.log("privete")
    return children;
  }

    return <Navigate state={location.pathname} to={`/auth/user/login`}></Navigate>;
};

export default Privete;
