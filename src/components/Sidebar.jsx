import {ICONS} from "../constants/icons.js";
import {routes} from "../router/routes.js";
import NavItem from "./NavItem.jsx";
import Button from "./Button.jsx";

const Sidebar = () => {

    function handleOnClick() {
        alert("crazy clicked");
    }

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
                <Button onClick={handleOnClick} className="collapse-btn">
                    Collapse
                </Button>
            </div>
        </aside>
    );
}

export default Sidebar;