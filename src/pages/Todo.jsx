import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";

const Todo = () => {
    return (
        <div className="todo">
            <PageHeader>
                <h1>To-do</h1>
                <Button onClick={() => alert("danger")} className="btn-danger">Danger</Button>
            </PageHeader>
        </div>
    )
}

export default Todo;