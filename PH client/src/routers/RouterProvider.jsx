import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogIn from "../pages/auth/login/LogIn";
import SignIn from "../pages/auth/signIn/SignIn";
import ForgetFrom from "../pages/auth/forgottenPassword/ForgetFrom";
import VerifyOTP from "../pages/auth/OTP/verifyOTP";
import SetPassword from "../pages/auth/setNewPassword/SetPassword";
import DashboardHome from "../pages/dashboard/home/DashboardHome";
import AllUsers from "../pages/dashboard/users/AllUsers";
import AllQuestions from "../pages/dashboard/questions/AllQuestions";
import Earning from "../pages/dashboard/earning/Earning";
import Subscription from "../pages/dashboard/subscription/Subscription";
import Faq from "../pages/dashboard/faq/Faq";
import Admin from "../lib/protector/Admin";
import Public from "../lib/protector/Public";
import PersonalInformation from "../pages/dashboard/personalProfile/PersonalInformation";
import Terms from "../pages/dashboard/Terms & Service/Terms";
import Editor from "../pages/dashboard/JodiEditor/Editor";
import ReadAloud from "../pages/dashboard/questions/speking/read-aloud/ReadAloud";
import Edit from "../pages/dashboard/questions/Edit/Edit";
import Add from "../pages/dashboard/questions/Add/Add";
import RepeatSentence from "../pages/dashboard/questions/speking/Repeat-Sentence/RepeatSentence";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>dashboard error</h1>,
    children: [
      {
        path: "/",
        element: (
          <Admin>
            <DashboardHome />
          </Admin>
        ),
      },
      {
        path: "/users",
        element: (
          <Admin>
            <AllUsers />
          </Admin>
        ),
      },
      {
        path: "/question",
        element: (
          <Admin>
            <AllQuestions />
          </Admin>
        ),
      },
      {
        path: "/question/read-aloud",
        element: (
          <Admin>
            <ReadAloud />
          </Admin>
        ),
      },
      {
        path: "/question/repeat-sentence",
        element: (
          <Admin>
            <RepeatSentence />
          </Admin>
        ),
      },
      {
        path: "/question/read-aloud/:id",
        element: (
          <Admin>
            <Edit />
          </Admin>
        ),
      },
      {
        path: "/question/read-aloud/add",
        element: (
          <Admin>
            <Add />
          </Admin>
        ),
      },
      {
        path: "/earning",
        element: (
          <Admin>
            <Earning />
          </Admin>
        ),
      },
      {
        path: "/subscription",
        element: (
          <Admin>
            <Subscription />
          </Admin>
        ),
      },
      {
        path: "/faq",
        element: (
          <Admin>
            <Faq />
          </Admin>
        ),
      },
      {
        path: "settings",
        children: [
          {
            path: "profile",
            element: (
              <Admin>
                <PersonalInformation />
              </Admin>
            ),
          },
          {
            path: "terms",
            element: (
              <Admin>
                <Terms />
              </Admin>
            ),
          },
          {
            path: "terms/edit",
            element: (
              <Admin>
                <Editor />
              </Admin>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/auth/admin",
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
      {
        path: "recover-password/otp",
        element: (
          <>
            <VerifyOTP />
          </>
        ),
      },
      {
        path: "recover-password/set-password",
        element: (
          <Public>
            <SetPassword />
          </Public>
        ),
      },
    ],
  },
]);

export default router;
