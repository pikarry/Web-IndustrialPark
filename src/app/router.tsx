import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/main-layout/main-layout";
import Contact from "./pages/contact";
import FactoryPark from "./pages/factory-park";
import Home from "./pages/home";
import IndustrialPark from "./pages/industrial-park";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import { authenticationLoader } from "./loaders/authentication";
import MyFactory from "./pages/my-factory";
import AdminLayout from "./layout/admin-layout/admin-layout";
import Dashboard from "./pages/admin/dashboard";
import IndustrialManagement from "./pages/admin/industrial-management";
import FactoryManagement from "./pages/admin/factory-management";
import AccountManagement from "./pages/admin/account-management";
import { authorizationLoader } from "./loaders/authorization";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
    loader: authorizationLoader,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    loader: authenticationLoader,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    loader: authenticationLoader,
  },
  {
    path: "/industrials",
    loader: authorizationLoader,
    children: [
      {
        path: "",
        element: (
          <MainLayout>
            <IndustrialPark />
          </MainLayout>
        ),
      },
      {
        path: ":industrialId/factories",
        element: (
          <MainLayout>
            <FactoryPark />
          </MainLayout>
        ),
      },
    ],
  },
  {
    path: "/my-factories",
    element: (
      <MainLayout>
        <MyFactory />
      </MainLayout>
    ),
    loader: authenticationLoader,
  },
  {
    path: "/contact",
    element: (
      <MainLayout>
        <Contact />
      </MainLayout>
    ),
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    loader: authenticationLoader,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "industrials",
        element: <IndustrialManagement />,
      },
      {
        path: "factories",
        element: <FactoryManagement />,
      },
      {
        path: "accounts",
        element: <AccountManagement />,
      },
    ],
  },
]);

export default router;
