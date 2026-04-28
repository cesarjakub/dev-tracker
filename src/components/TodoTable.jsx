import TodoRow from "./TodoRow.jsx";
import {useRef, useState} from "react";

const TodoTable = ({ tasks, onDelete, onToggleDone, onReorder }) => {
    const [dragOverId, setDragOverId] = useState(null);
    const dragIdRef = useRef(null);

    const handleDragStart = (e, taskId) => {
        dragIdRef.current = taskId;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", String(taskId));
    };

    const handleDragOver = (e, taskId) => {
        e.preventDefault()
        e.dataTransfer.effectAllowed = "move";
        if (taskId !== dragIdRef.current) setDragOverId(taskId);
    };

    const handleDragLeave = () => {
        setDragOverId(null);
    }

    const handleDrop = (e, targetId) => {
        e.preventDefault();
        setDragOverId(null);

        const sourceId = dragIdRef.current;
        if(!sourceId || sourceId === targetId) return;

        const sourceIndex = tasks.findIndex(task => task.id === sourceId);
        const targetIndex = tasks.findIndex(task => task.id === targetId);
        if (sourceIndex === -1 || targetIndex === -1) return;

        const reordered = [...tasks];
        const [moved] = reordered.splice(sourceIndex, 1);
        reordered.splice(targetIndex, 0, moved);

        if (onReorder) onReorder(reordered);
    }

    const handleDragEnd = () => {
        dragIdRef.current = null;
        setDragOverId(null);
    }

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>DONE</th>
                        <th>TASK-ID</th>
                        <th>TASK</th>
                        <th>PRIORITY</th>
                        <th>DELETE</th>
                    </tr>
                </thead>

                <tbody>
                {tasks.map(task => (
                    <TodoRow
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onToggleDone={onToggleDone}
                        isDragOver={dragOverId === task.id}
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragOver={(e) => handleDragOver(e, task.id)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, task.id)}
                        onDragEnd={handleDragEnd}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TodoTable