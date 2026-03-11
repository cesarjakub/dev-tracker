const Button = ({ children, icon, iconAlt, onClick, className = "", ...props }) => {
    return (
        <button onClick={onClick} className={`btn ${className}`} {...props}>
            {icon && <img src={icon} alt={iconAlt} className="btn-icon" />}
            {children}
        </button>
    )
}

export default Button;