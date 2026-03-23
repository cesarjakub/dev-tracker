import Button from "../Button.jsx";

const ProjectForm = ({ onSubmit }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));
        onSubmit(data);

        e.target.reset();
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Project</label>
                <input type="text" name="title" placeholder="Enter project name" required />
            </div>

            <Button type="submit" className="btn-primary">
                Create project
            </Button>
        </form>
    )
}

export default ProjectForm;