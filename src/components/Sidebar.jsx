import {ICONS} from "../constants/icons.js";
import {routes} from "../router/routes.js";
import NavItem from "./NavItem.jsx";
import Button from "./Button.jsx";
import {useState} from "react";

const Sidebar = () => {
    const [isCollapse, setisCollapse] = useState(false);

    return (
        <aside className={`sidebar ${isCollapse ? "sidebar-collapsed" : ""}`}>
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
                        isCollapse={isCollapse}
                    />
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-footer-line"></div>
                <Button icon={ICONS.SIDEBAR} onClick={() => setisCollapse(prev => !prev)} className="collapse-btn">
                    {!isCollapse && "Collapse"}
                </Button>
            </div>
        </aside>
    );
}

export default Sidebar;