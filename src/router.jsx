import { createBrowserRouter } from "react-router";
import App from "./App";
import RoutingError from "./components/RoutingError/RoutingError";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { userLoader } from "./loaders/userLoader";
import HomePage from "./pages/HomePage/HomePage";
import { homeArticlesLoader } from "./loaders/articleLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RoutingError />,
    loader: userLoader,
    HydrateFallback: LoadingSpinner,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeArticlesLoader,
      },
    ],
  },
]);
