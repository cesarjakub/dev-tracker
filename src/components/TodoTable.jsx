import TodoRow from "./TodoRow.jsx";

const TodoTable = ({ tasks, onDelete, onToggleDone }) => {
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
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TodoTable