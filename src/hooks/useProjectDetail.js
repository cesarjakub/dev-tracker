import {useEffect, useState} from "react";
import router from "../router/index.js";
import {useProject} from "./useProject.js";

export const useProjectDetail = () => {
    const { projects, updateProject, addSession } = useProject();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const params = router.getParams();
        const proj = projects.find(p => p.title === params.name);
        setProject(proj);
    }, [projects]);

    const updateCurrentProject = (data) => {
        if (!project) return;
        updateProject(project.id, data);
    };

    const addSessionToProject = (duration) => {
        if (!project) return;
        addSession(project.id, duration);
    };

    return { project, updateCurrentProject, addSessionToProject };
};