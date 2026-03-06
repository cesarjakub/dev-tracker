import Dashboard from "../pages/Dashboard.jsx";
import ToDo from "../pages/ToDo.jsx";
import Calendar from "../pages/Calendar.jsx";
import Analytics from "../pages/Analytics.jsx";
import NotFound from "../pages/NotFound.jsx";

export const routes = [
    { path: "/", component: Dashboard, label: "Dashboard" },
    { path: "/to-do", component: ToDo, label: "To-Do" },
    { path: "/calendar", component: Calendar, label: "Calendar" },
    { path: "/analytics", component: Analytics, label: "Analytics" },
];

export const notFound = NotFound;