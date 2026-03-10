import {ICONS} from "../constants/icons.js";
import Projects from "../pages/Projects.jsx";
import Todo from "../pages/Todo.jsx";
import Calendar from "../pages/Calendar.jsx";
import Analytics from "../pages/Analytics.jsx";
import NotFound from "../pages/NotFound.jsx";

export const routes = [
    { path: "/", component: Projects, label: "Projects", icon: ICONS.DASHBOARD },
    { path: "/to-do", component: Todo, label: "To-Do", icon: ICONS.TODO },
    { path: "/calendar", component: Calendar, label: "Calendar", icon: ICONS.CALENDAR },
    { path: "/analytics", component: Analytics, label: "Analytics", icon: ICONS.ANALYTICS },
];

export const notFound = NotFound;