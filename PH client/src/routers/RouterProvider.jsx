import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogIn from "../pages/auth/login/LogIn";
import SignIn from "../pages/auth/signIn/SignIn";
import ForgetFrom from "../pages/auth/forgottenPassword/ForgetFrom";
import Home from "../pages/auth/home/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>dashboard error</h1>,
    children: [
      {
        path: "/",
        element: (
          <Home/>
        ),
      
      },
    ],
  },
  {
    path: "/auth/user",
    errorElement: <h1>auth error</h1>,
    children: [
      {
        path: "login",
        element: (
          <>
            <LogIn />
          </>
        ),
      },
      {
        path: "registration",
        element: (
          <>
            <SignIn />
          </>
        ),
      },
      {
        path: "recover-password",
        element: (
          <>
            <ForgetFrom />
          </>
        ),
      },
     
     
    ],
  },
]);

export default router;
