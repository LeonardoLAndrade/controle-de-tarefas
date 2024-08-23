import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import NovaTarefa from "./pages/NovaTarefa.jsx";
import Principal from "./pages/Principal.jsx";

import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "cadastro",
    element: <Cadastro />,
  },
  {
    path: "novaTarefa",
    element: <NovaTarefa />,
  },
  {
    path: "principal",
    element: <Principal />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
