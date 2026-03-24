import Button from "./Button.jsx";
import router from "../router/index.js";

const ProjectCard = ({ project, onDelete }) => {
    return (
        <div className="project-card border rounded p-4 shadow-md flex flex-col justify-between">
            <h2>{project.title}</h2>
            <p>{project.description || "No description yet."}</p>
            <div className="mt-2 flex justify-between">
                <Button onClick={() => router.navigate(`/projects/${project.title}`)}>
                    View
                </Button>
                <Button onClick={() => onDelete(project.id)} className="btn-danger">
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ProjectCard;