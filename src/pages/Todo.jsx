import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import {ICONS} from "../constants/icons.js";
import TodoTable from "../components/TodoTable.jsx";
import {useState} from "react";
import Modal from "../components/Modal.jsx";

const Todo = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);

    return (
        <div className="todo">
            <PageHeader>
                <h1>To-do</h1>
                <Button onClick={() => setAddModalOpen(true)} icon={ICONS.ADD} iconAlt="add icon" className="btn-primary">Create</Button>
            </PageHeader>

            {addModalOpen && (
                <Modal title="Create task" onClose={() => setAddModalOpen(false)}>
                    <form className="task-form">
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

                        <Button type="submit" className="btn-primary" onClick={() => {
                            alert("Created");
                        }}>
                            Create task
                        </Button>
                    </form>
                </Modal>
            )}

            <TodoTable/>
        </div>
    )
}

export default Todo;