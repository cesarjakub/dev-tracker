import {mockTasks} from "../data/mockTasks.js";
import {useState} from "react";
import TodoRow from "./TodoRow.jsx";

const TodoTable = () => {

    const [tasks, setTasks] = useState(mockTasks);

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleToggleDone = (id, done) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: done ? "Done" : "To-Do" } : task
        ));
    };

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>DONE</th>
                        <th>TASK-ID</th>
                        <th>TASK</th>
                        <th>STATUS</th>
                        <th>PRIORITY</th>
                        <th>DELETE</th>
                    </tr>
                </thead>

                <tbody>
                {tasks.map(task => (
                    <TodoRow
                        key={task.id}
                        task={task}
                        onDelete={handleDelete}
                        onToggleDone={handleToggleDone}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TodoTable