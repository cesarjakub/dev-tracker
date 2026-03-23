import {ICONS} from "../constants/icons.js";
import Projects from "../pages/Projects.jsx";
import Todo from "../pages/Todo.jsx";
import Calendar from "../pages/Calendar.jsx";
import Analytics from "../pages/Analytics.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProjectDetail from "../pages/ProjectDetail.jsx";

export const routes = [
    { path: "/", component: Projects, label: "Projects", icon: ICONS.DASHBOARD, nav: true },
    { path: "/to-do", component: Todo, label: "To-Do", icon: ICONS.TODO, nav: true },
    { path: "/calendar", component: Calendar, label: "Calendar", icon: ICONS.CALENDAR, nav: true },
    { path: "/analytics", component: Analytics, label: "Analytics", icon: ICONS.ANALYTICS, nav: true },

    { path: "/projects/:name", component: ProjectDetail, nav: false },
];

export const navRoutes = routes.filter(route => route.nav);

export const notFound = NotFound;
