import {useProject} from "../hooks/useProject.js";
import NotFound from "./NotFound.jsx";
import router from "../router/index.js";
import {useEffect, useState} from "react";
import formatDate from "../utils/formatDate.js";

const ProjectDetail = () => {
    const [project, setProject] = useState(null);
    const { projects } = useProject();

    useEffect(() => {
        const params = router.getParams();
        const proj = projects.find(p => p.title === params.name);
        setProject(proj);
    }, [projects]);

    if (!project) return <NotFound />;



    return (
        <div className="project-detail">
            <h1>{project.title}</h1>
            <p>Created: {formatDate(project.date)}</p>
            <p>Session time: {project.sessionTime}</p>
            <p>Total time: {project.totalTime}</p>
            <p>{project.description}</p>
            <p>{project.wiki}</p>
        </div>
    )
}

export default ProjectDetail;