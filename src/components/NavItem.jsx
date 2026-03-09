import router from "../router/index.js";

export default function NavItem({path, label, icon}) {
    const isActive = router.isActive(path);

    function handleOnClick(e) {
        e.preventDefault();
        router.navigate(path);
    }

    return (
        <a href={path} onClick={handleOnClick} className={`nav-item ${isActive ? "active" : ""}`}>
            {icon && <img src={icon} alt={label} className="nav-icon" />}
            <span>{label}</span>
        </a>
    );
}