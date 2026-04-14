import {useState} from "react";
import { ICONS } from "../constants/icons.js";
import { navRoutes } from "../router/routes.js";
import NavItem from "./NavItem.jsx";
import Button from "./Button.jsx";

const MobileNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="mobile-navbar">
            <div className="mobile-header-bar">
                <img src={ICONS.SMALL_LOGO} alt="Logo" className="mobile-logo" />
                <Button
                    icon={ICONS.MENU}
                    onClick={() => setIsOpen(!isOpen)}
                    iconAlt="Menu icon"
                    className="collapse-btn hamburger">
                </Button>
            </div>

            <nav className={`mobile-nav-menu ${isOpen ? "open" : ""}`}>
                {navRoutes.map((route) => (
                    <NavItem
                        key={route.path}
                        path={route.path}
                        label={route.label}
                        icon={route.icon}
                        isCollapse={!isOpen}
                        onClick={() => setIsOpen(false)}
                    />
                ))}
            </nav>

            {isOpen && (
                <div className="mobile-backdrop" onClick={() => setIsOpen(false)} />
            )}
        </header>
    )
}

export default MobileNavBar