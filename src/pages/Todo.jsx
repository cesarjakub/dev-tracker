import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import {ICONS} from "../constants/icons.js";

const Todo = () => {
    return (
        <div className="todo">
            <PageHeader>
                <h1>To-do</h1>
                <Button onClick={() => alert("Primary")} icon={ICONS.ADD} iconAlt="add icon" className="btn-primary">Create</Button>
            </PageHeader>
        </div>
    )
}

export default Todo;