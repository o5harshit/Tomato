import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "../src/Pages/Home/Home";
import Cart from "../src/Pages/Cart/Cart";
import PlaceOrder from "../src/Pages/placeOrder/Placeorder";
import App from "./App";
import Verify from "./Pages/Verify/Verify";
import Myorders from "./Pages/Myorders/Myorders";
const RoutesPages = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/order",
        element: <PlaceOrder />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path : "/verify",
        element : <Verify/>
      },
      {
        path : "/myorders",
        element : <Myorders/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={RoutesPages} />
  </StrictMode>
);
