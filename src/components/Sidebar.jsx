import {ICONS} from "../constants/icons.js";
import {routes} from "../router/routes.js";
import NavItem from "./NavItem.jsx";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src={ICONS.LOGO} className="sidebar-logo" alt="DevTracker" />
            </div>

            <nav>
                {routes.map((route) => (
                    <NavItem
                        key={route.path}
                        path={route.path}
                        label={route.label}
                        icon={route.icon}
                    />
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="collapse-btn">Collapse</button>
            </div>
        </aside>
    );
}