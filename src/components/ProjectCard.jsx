import Button from "./Button.jsx";
import router from "../router/index.js";
import {ICONS} from "../constants/icons.js";

const ProjectCard = ({ project, onDelete }) => {
    return (
        <div className="project-card">
            <h1>{project.title}</h1>
            <p>{project.description || "No description yet."}</p>
            <div className="actions">
                <Button onClick={() => router.navigate(`/projects/${project.title}`)} className="btn-primary">
                    View
                </Button>
                <Button onClick={() => onDelete(project.id)} icon={ICONS.TRASH} iconAlt="trash can" className="btn-danger">
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ProjectCard;