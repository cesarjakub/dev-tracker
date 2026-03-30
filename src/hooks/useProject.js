import {useEffect, useState} from "react";
import storage from "../utils/localStorage.js";

export const useProject = () => {
    const [projects, setProjects] = useState(() => storage.getObject("projects") || []);

    useEffect(() => {
        storage.setObject("projects", projects);
    }, [projects]);

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

    const getProjectById = (id) => {
        return projects.find(p => p.id === id);
    }

    const deleteProject = (id) => {
        setProjects(projects.filter(p => p.id !== id));
    }

    const updateProject = (id, data) => {
        setProjects(projects.map(p =>
            p.id === id ? { ...p, ...data } : p
        ));
    };

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