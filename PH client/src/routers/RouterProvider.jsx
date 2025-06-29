import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogIn from "../pages/auth/login/LogIn";
import SignIn from "../pages/auth/signIn/SignIn";
import ForgetFrom from "../pages/auth/forgottenPassword/ForgetFrom";
import Home from "../pages/home/Home";
import NotFound from "../pages/NotFounds/NotFound";
import AddEvents from "../pages/events/add-events/AddEvents";
import Privete from "../pages/auth/private/Private";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound/>,
    children: [
      {
        path: "/",
        element: (
          <Home/>
        ),
      
      },
      {
        path: "/add-event",
        element: (
          <Privete>
            <AddEvents/>
          </Privete>

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
