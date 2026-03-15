import {useEffect, useState} from "react";
import Button from "./Button.jsx";
import {ICONS} from "../constants/icons.js";

const TodoRow = ({ task, onDelete, onToggleDone }) => {
    const [done, setDone] = useState(task.status === "Done");

    useEffect(() => {
        setDone(task.status === "Done");
    }, [task.status]);

    const handleCheckbox = () => {
        const newDone = !done;
        setDone(newDone);
        if (onToggleDone) onToggleDone(task.id, newDone);
    };

    return (
        <tr className={`todo-row ${done ? "done" : ""}`}>
            <td className="todo-checkbox">
                <input type="checkbox" checked={done} onChange={handleCheckbox} />
            </td>
            <td className="todo-id">#{task.id}</td>
            <td className="todo-title">{task.title}</td>
            <td className="todo-status">
                <span className={`status-badge status-${task.status.toLowerCase()}`}>
                    {task.status}
                </span>
            </td>
            <td className="todo-status">
                <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
            </td>
            <td className="todo-delete">
                <Button icon={ICONS.TRASH} iconAlt="delete" onClick={() => onDelete(task.id)} className="btn-danger"></Button>
            </td>
        </tr>
    )
}

export default TodoRow;