import { lazy } from "react";
import { Navigate } from "react-router-dom";



// import User from "../views/User.jsx";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const User = lazy(() => import("../views/user/User.jsx"));
const UserForm = lazy(() => import("../views/user/UserForm.jsx"));
const UserFromUpdate = lazy(() => import("../views/user/UpdateUserFrom.jsx"));
const Student = lazy(() => import("../views/student/Student.jsx"));
const StudentForm = lazy(() => import("../views/student/StudentForm.jsx"));
const Product = lazy(() => import("../views/product/Product.jsx"));
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/user", exact: true, element: <User /> },
      { path: "/userform", exact: true, element: <UserForm /> },
      { path: "/user/user/userform/:_id", exact: true, element: <UserFromUpdate /> },
      { path: "/student", exact: true, element: <Student /> },
      { path: "/studentform", exact: true, element: <StudentForm /> },
      { path: "/product", exact: true, element: <Product /> },
    ],
  },
];

export default ThemeRoutes;
