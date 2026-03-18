import { useState, useEffect } from "react";
import storage from "../utils/localStorage.js";

export const useTasks = () => {
    const [tasks, setTasks] = useState(() => storage.getObject("tasks") || []);

    useEffect(() => {
        storage.setObject("tasks", tasks);
    }, [tasks]);

    const addTask = (data) => {
        const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
        const newTask = {
            id: maxId + 1,
            title: data.title,
            status: data.status,
            priority: data.priority,
        };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleDone = (id, done) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: done ? "Done" : "Todo" } : task
        ));
    };

    return { tasks, addTask, deleteTask, toggleDone };
}