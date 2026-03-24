import Button from "../Button.jsx";
import {useState} from "react";

const ProjectForm = ({ onSubmit, projects }) => {
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        if (/\s/.test(data.title)) {
            setError("Project title cannot contain spaces!");
            return;
        }

        const exists = projects.some(p => p.title.toLowerCase() === data.title.toLowerCase());

        if (exists) {
            setError("Project with this title already exists!");
            return;
        }

        onSubmit(data);

        e.target.reset();
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Project</label>
                <input type="text" name="title" placeholder="Enter project name" required />
            </div>
            {error && <div className="form-error">{error}</div>}
            <Button type="submit" className="btn-primary">
                Create project
            </Button>
        </form>
    )
}

export default ProjectForm;