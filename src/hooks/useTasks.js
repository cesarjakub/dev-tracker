import { useState, useEffect } from "react";
import storage from "../utils/localStorage.js";

/**
 * Manages the tasks array with full CRUD operations and derived statistics.
 * Tasks are persisted to `localStorage` under the key `"tasks"`.
 */
export const useTasks = () => {
    const [tasks, setTasks] = useState(() => storage.getObject("tasks") || []);

    useEffect(() => {
        storage.setObject("tasks", tasks);
    }, [tasks]);

    /**
     * Creates a new task and appends it to the list.
     * The id is derived from the current maximum id to avoid collisions.
     *
     * @param {{ title: string, status: string, priority: string }} data - Raw form data.
     */
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

    /**
     * Removes the task with the given id from the list.
     *
     * @param {number} id - The id of the task to remove.
     */
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    /**
     * Updates the status of a task to `"Done"` or `"Todo"`.
     *
     * @param {number}  id   - The id of the task to update.
     * @param {boolean} done - `true` sets status to `"Done"`, `false` sets it to `"Todo"`.
     */
    const toggleDone = (id, done) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: done ? "Done" : "Todo" } : task
        ));
    };

    /**
     * Replaces the entire tasks array with a reordered version.
     *
     * @param {object[]} reordered
     */
    const reorderTasks = (reordered) => {
        setTasks(reordered);
    }

    const total = tasks.length > 0 ? tasks.length : 0;
    const todo = tasks.filter(task => task.status === "Todo").length;
    const done = tasks.filter(task => task.status === "Done").length;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;

    return { tasks, addTask, deleteTask, toggleDone, reorderTasks, stats: { total, done, todo, progress } };
}