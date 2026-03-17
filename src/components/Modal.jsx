import {ICONS} from "../constants/icons.js";
import Button from "./Button.jsx";

const Modal = ({ title, children, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">

                <div className="modal-header">
                    <h2>{title}</h2>

                    <Button
                        icon={ICONS.CLOSE}
                        onClick={onClose}
                        className="btn-primary"

                    />
                </div>

                <div className="modal-body">
                    {children}
                </div>

            </div>
        </div>
    );
}

export default Modal;