import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useMe } from "../hooks/useMe";
import linking from "./linking";
import { Suspense, lazy } from "react";
import Settings from "@/components/Settings";
import Security from "@/pages/Security";
// import Layout from "../components/Layout";
// import UnauthorizedLayout from "../components/Layout/UnauthorizedLayout";
// import Login from "../pages/Login/Login";
// import Registration from "../pages/Registration/Registration";
// import ErrorPage from "../pages/Error/Error";
// import ResetPassword from "../pages/ResetPassword";
// import ChangePassword from "../pages/ChangePassword/ChangePassword";
// import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
// import Verify from "../pages/Verify";
// import ProfileCard from "../pages/ProfileCard";

const Layout = lazy(() => import("../components/Layout"));
const UnauthorizedLayout = lazy(() => import("../components/Layout/UnauthorizedLayout"));
const Login = lazy(() => import("../pages/Login/Login"));
const Registration = lazy(() => import("../pages/Registration/Registration"));
const ErrorPage = lazy(() => import("../pages/Error/Error"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));
const Verify = lazy(() => import("../pages/Verify"));
const SkeletonCard = lazy(() => import("../pages/SkeletonCard"));
const Profile = lazy(() => import("@/pages/Profile"));

const AuthorizedRouter = () => {
  const auth = useAuth();
  const { isLoading } = useMe();
  const location = useLocation();

  if (!auth.authorized) {
    return <Navigate to={linking.auth.login} state={{ from: location }} />;
  }

  return (
    <Layout loading={isLoading}>
      <Outlet />
    </Layout>
  );
};

const UnauthorizedRouter = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.authorized) {
    const path = location.state?.from?.pathname ?? linking.dashboard.root;

    return <Navigate to={path} />;
  }

  return (
    <UnauthorizedLayout>
      <Outlet />
    </UnauthorizedLayout>
  );
};

const NoMatch = () => {
  const auth = useAuth();
  const location = useLocation();

  const path = auth.authorized
    ? location.state?.from?.pathname ?? linking.dashboard.root
    : linking.auth.login;

  return <Navigate replace to={path} />;
};

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback>
        <AuthorizedRouter />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: linking.dashboard.root,
        element: (
          <Suspense fallback>
            <SkeletonCard />
          </Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <Suspense fallback>
            <Settings />
          </Suspense>
        ),
        children: [
          {
            path: "/settings/profile",
            element: (
              <Suspense fallback>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: "/settings/security",
            element: (
              <Suspense fallback>
                <Security />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    element: (
      <Suspense fallback>
        <UnauthorizedRouter />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: linking.auth.login,
        element: (
          <Suspense fallback>
            <Login />
          </Suspense>
        ),
      },
      {
        path: linking.auth.register,
        element: (
          <Suspense fallback>
            <Registration />
          </Suspense>
        ),
      },
      {
        path: linking.auth.forgetPassword,
        element: (
          <Suspense fallback>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: linking.auth.resetPassword,
        element: (
          <Suspense fallback>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: linking.auth.verify,
        element: (
          <Suspense fallback>
            <Verify length={6} />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
