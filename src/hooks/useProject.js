import {useEffect, useState} from "react";
import storage from "../utils/localStorage.js";

/**
 * Manages the projects array with full CRUD operations and session tracking.
 * Projects are persisted to `localStorage` under the key `"projects"`.
 */
export const useProject = () => {
    const [projects, setProjects] = useState(() => storage.getObject("projects") || []);

    useEffect(() => {
        storage.setObject("projects", projects);
    }, [projects]);

    /**
     * Creates a new project and appends it to the list.
     *
     * @param {{ title: string, description?: string, wiki?: string }} data - Raw form data.
     */
    const addProject = (data) => {
        const maxId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) : 0;

        const newProject = {
            id: maxId + 1,
            title: data.title,
            date: new Date(),
            lastEdited: new Date(),
            description: data.description || "No description yet.",
            wiki: data.wiki || "No wiki yet.",
            sessionTime: 0,
            totalTime: 0,
            sessions: []
        };
        setProjects([...projects, newProject]);
    }

    /**
     * Finds and returns a single project by its numeric id.
     *
     * @param {number} id - The project id to look up.
     * @returns {Project|undefined} The matching project, or `undefined` if not found.
     */
    const getProjectById = (id) => {
        return projects.find(p => p.id === id);
    }

    /**
     * Removes the project with the given id from the list.
     *
     * @param {number} id - The id of the project to delete.
     */
    const deleteProject = (id) => {
        setProjects(projects.filter(p => p.id !== id));
    }

    /**
     * Merges `data` into the project identified by `id`.
     *
     * @param {number}  id   - The id of the project to update.
     * @param {Partial<Project>} data - Fields to update on the project.
     */
    const updateProject = (id, data) => {
        setProjects(projects.map(p =>
            p.id === id ? { ...p, ...data } : p
        ));
    };

    /**
     * Appends a new session record to a project and updates its cumulative time.
     *
     * @param {number} id       - The id of the project to update.
     * @param {number} duration - Session duration in seconds.
     */
    const addSession = (id, duration) => {
        setProjects(projects.map(p => {
            if (p.id !== id) return p;

            return {
                ...p,
                sessionTime: duration,
                totalTime: p.totalTime + duration,
                lastEdited: new Date(),
                sessions: [
                    ...(p.sessions || []),
                    {
                        date: new Date(),
                        time: duration
                    }
                ]
            };
        }));
    };

    return {projects, addProject, deleteProject, updateProject, getProjectById, addSession};
}