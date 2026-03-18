import Button from "../Button.jsx";

const TaskForm = ({ onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));
        onSubmit(data);

        e.target.reset();
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Task</label>
                <input type="text" name="title" placeholder="Enter task name" required />
            </div>

            <div className="task-select-group">
                <div className="form-group">
                    <label>Status</label>
                    <select name="status" required>
                        <option value="To-Do">To-Do</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Priority</label>
                    <select name="priority" required>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>

            <Button type="submit" className="btn-primary">
                Create task
            </Button>
        </form>
    )
}

export default TaskForm