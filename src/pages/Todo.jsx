import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import {ICONS} from "../constants/icons.js";
import TodoTable from "../components/TodoTable.jsx";
import {useState} from "react";
import Modal from "../components/Modal.jsx";
import TaskForm from "../components/forms/TaskForm.jsx";

const Todo = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleSubmit = (data) => {
        console.log(data);
        setAddModalOpen(false);
    }

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

            <TodoTable/>
        </div>
    )
}

export default Todo;