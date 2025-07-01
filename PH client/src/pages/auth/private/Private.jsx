import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useProfile from "../../../hooks/getUserProfile";
import Loading from "../../loadding/Loading";

const Private = ({ children }) => {
  const { data, isLoading } = useProfile();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const user = data?.user;
  const isUserValid = user && user.email && user.name && user.photo;

  useEffect(() => {
    let timer;
    if (!isLoading && !isUserValid) {
      timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, isUserValid]);

  if (isLoading) {
    return <Loading />;
  }

  if (isUserValid) {
    return children;
  }

  if (shouldRedirect) {
    return <Navigate to="/auth/user/login" state={{ from: location }} replace />;
  }

  return <Loading />;
};

export default Private;