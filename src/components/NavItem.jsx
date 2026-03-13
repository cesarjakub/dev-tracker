import router from "../router/index.js";

const NavItem = ({path, label, icon, isCollapse}) => {
    const isActive = router.isActive(path);

    function handleOnClick(e) {
        e.preventDefault();
        router.navigate(path);
    }

    return (
        <a href={path} onClick={handleOnClick} className={`nav-item ${isActive ? "active" : ""}`}>
            <img src={icon} alt={label} className="nav-icon" />
            {!isCollapse && <span>{label}</span>}
        </a>
    );
}

export default NavItem;