import {useEffect, useState} from "react";
import Button from "./Button.jsx";
import {ICONS} from "../constants/icons.js";
import Badge from "./Badge.jsx";

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

    const statusVariant = {
        Done: "success",
        Todo: "danger"
    };

    const priorityVariant = {
        Low: "success",
        Medium: "warning",
        High: "danger"
    };

    return (
        <tr className={`todo-row ${done ? "done" : ""}`}>
            <td className="todo-checkbox">
                <input type="checkbox" checked={done} onChange={handleCheckbox} />
            </td>
            <td>#{task.id}</td>
            <td>{task.title}</td>
            <td>
                <Badge variant={statusVariant[task.status]}>
                    {task.status}
                </Badge>
            </td>
            <td>
                <Badge variant={priorityVariant[task.priority]}>
                    {task.priority}
                </Badge>
            </td>
            <td className="todo-delete">
                <Button icon={ICONS.TRASH} iconAlt="delete" onClick={() => onDelete(task.id)} className="btn-danger"></Button>
            </td>
        </tr>
    )
}

export default TodoRow;