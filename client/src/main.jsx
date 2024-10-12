import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import EditPost from "./pages/EditPost.jsx";
import Profile from "./pages/Profile.jsx";
import EditUser from "./pages/EditUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/u/:username",
        element: <Profile />,
      },
      {
        path: "/u/:username/edit",
        element: <EditUser />,
      },
      {
        path: "/blog/:slug",
        element: <Blog />,
      },
      {
        path: "/create-post",
        element: <CreateBlog />,
      },
      {
        path: "/blog/edit/:blogId",
        element: <EditPost />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
);
