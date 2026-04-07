import {ICONS} from "../constants/icons.js";
import {navRoutes} from "../router/routes.js";
import NavItem from "./NavItem.jsx";
import Button from "./Button.jsx";
import {useState} from "react";
import NameDay from "./NameDay.jsx";

const Sidebar = () => {
    const [isCollapse, setIsCollapse] = useState(false);

    return (
        <aside className={`sidebar ${isCollapse ? "sidebar-collapsed" : ""}`}>

            <div className="sidebar-header">
                    <img src={isCollapse ? ICONS.SMALL_LOGO : ICONS.LOGO} className="sidebar-logo" alt="DevTracker" />
            </div>

            <nav>
                {navRoutes.map((route) => (
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
                <NameDay collapsed={isCollapse} />
                <div className="sidebar-footer-line"></div>
                <Button icon={ICONS.SIDEBAR} onClick={() => setIsCollapse(prev => !prev)} className="collapse-btn">
                    {!isCollapse && "Collapse"}
                </Button>
            </div>
        </aside>
    );
}

export default Sidebar;