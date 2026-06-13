import { createBrowserRouter } from "react-router";
import App from "./App";
import RoutingError from "./components/RoutingError/RoutingError";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { userLoader } from "./loaders/userLoader";
import HomePage from "./pages/HomePage/HomePage";
import { homeArticlesLoader } from "./loaders/articleLoader";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RoutingError />,
    HydrateFallback: LoadingSpinner,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeArticlesLoader,
      },
      {
        path: "/article/:slug",
        element: <ArticlePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
