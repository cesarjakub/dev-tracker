import DashboardIcon from "../assets/icons/Dashboard.svg";
import TodoIcon from "../assets/icons/todo.svg";
import CalendarIcon from "../assets/icons/calendar.svg";
import AnalyticsIcon from "../assets/icons/analytics.svg";

import Projects from "../pages/Projects.jsx";
import Todo from "../pages/Todo.jsx";
import Calendar from "../pages/Calendar.jsx";
import Analytics from "../pages/Analytics.jsx";
import NotFound from "../pages/NotFound.jsx";

export const routes = [
    { path: "/", component: Projects, label: "Projects", icon: DashboardIcon },
    { path: "/to-do", component: Todo, label: "To-Do", icon: TodoIcon },
    { path: "/calendar", component: Calendar, label: "Calendar", icon: CalendarIcon },
    { path: "/analytics", component: Analytics, label: "Analytics", icon: AnalyticsIcon },
];

export const notFound = NotFound;