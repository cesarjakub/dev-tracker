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
            totalTime: 0
        };
        setProjects([...projects, newProject]);
    }

    const deleteProject = (id) => {
        setProjects(projects.filter(p => p.id !== id));
    }

    const updateProject = (id, data) => {
        setProjects(projects.map(p =>
            p.id === id ? { ...p, ...data } : p
        ));
    };

    return {projects, addProject, deleteProject, updateProject};
}