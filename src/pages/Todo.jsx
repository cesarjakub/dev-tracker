import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import {ICONS} from "../constants/icons.js";
import TodoTable from "../components/TodoTable.jsx";
import { useTasks } from "../hooks/useTasks.js";
import {useState} from "react";
import Modal from "../components/Modal.jsx";
import TaskForm from "../components/forms/TaskForm.jsx";

const Todo = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const { tasks, addTask, deleteTask, toggleDone } = useTasks();

    const handleSubmit = (data) => {
        addTask(data);
        setAddModalOpen(false);
    };

    return (
        <div className="todo">
            <PageHeader>
                <h1>To-do</h1>
                <Button onClick={() => setAddModalOpen(true)} icon={ICONS.ADD} iconAlt="add icon" className="btn-primary">Create</Button>
            </PageHeader>

            {addModalOpen && (
                <Modal title="Create task" onClose={() => setAddModalOpen(false)}>
                    <TaskForm onSubmit={handleSubmit}/>
                </Modal>
            )}

            <TodoTable tasks={tasks} onDelete={deleteTask} onToggleDone={toggleDone} />
        </div>
    )
}

export default Todo;