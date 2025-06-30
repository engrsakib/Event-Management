import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogIn from "../pages/auth/login/LogIn";
import SignIn from "../pages/auth/signIn/SignIn";
import Home from "../pages/home/Home";
import NotFound from "../pages/NotFounds/NotFound";
import AddEvents from "../pages/events/add-events/AddEvents";
import Privete from "../pages/auth/private/Private";
import AllEvent from "../pages/events/all-event/AllEvent";
import MyEvents from "../pages/events/my-events/MyEvents";


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
      {
        path: "/events",
        element: (
          <Privete>
            <AllEvent/>
          </Privete>

        ),
      
      },
      {
        path: "/my-events",
        element: (
          <Privete>
            <MyEvents/>
          </Privete>

        ),
      
      },
      {
        path: "/auth/user/login",
        element: (
          <>
            <LogIn />
          </>
        ),
      },
      {
        path: "/auth/user/registration",
        element: (
          <>
            <SignIn />
          </>
        ),
      },
    ],
  },
]);

export default router;
