import Projects from "../pages/Projects.jsx";
import Todo from "../pages/Todo.jsx";
import Calendar from "../pages/Calendar.jsx";
import Analytics from "../pages/Analytics.jsx";
import NotFound from "../pages/NotFound.jsx";

export const routes = [
    { path: "/", component: Projects, label: "Projects" },
    { path: "/to-do", component: Todo, label: "To-Do" },
    { path: "/calendar", component: Calendar, label: "Calendar" },
    { path: "/analytics", component: Analytics, label: "Analytics" },
];

export const notFound = NotFound;