import router from "../router/index.js";
import { routes } from "../router/routes.js";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <nav>
                {routes.map(route => (
                    <a
                        key={route.path}
                        href={route.path}
                        className={router.isActive(route.path) ? "active" : ""}
                        onClick={(e) => {
                            e.preventDefault();
                            router.navigate(route.path);
                        }}
                    >
                        {route.label}
                    </a>
                ))}
            </nav>
        </aside>
    );
}