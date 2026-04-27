import {useEffect, useState} from "react";
import router from "../router/index.js";
import {useProject} from "./useProject.js";

/**
 * Reads the `:name` URL parameter via the router, finds the matching project
 * from the project store, and returns that project along with convenience
 * wrappers for updating it and logging work sessions.
 */
export const useProjectDetail = () => {
    const { projects, updateProject, addSession } = useProject();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const params = router.getParams();
        const proj = projects.find(p => p.title === params.name);
        setProject(proj);
    }, [projects]);

    /**
     * Partially updates the currently viewed project.
     * Does nothing when `project` is `null`.
     *
     * @param {Partial<import('./useProject').Project>} data - Fields to merge into the project.
     */
    const updateCurrentProject = (data) => {
        if (!project) return;
        updateProject(project.id, data);
    };

    /**
     * Records a new work session for the currently viewed project.
     * Does nothing when `project` is `null`.
     *
     * @param {number} duration - Session duration in seconds.
     */
    const addSessionToProject = (duration) => {
        if (!project) return;
        addSession(project.id, duration);
    };

    return { project, updateCurrentProject, addSessionToProject };
};