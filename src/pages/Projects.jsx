import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";

const Projects = () => {
    return (
        <div className="projects">
            <PageHeader>
                <h1>Projects</h1>
                <Button onClick={() => alert("primary")} className="btn-primary">Primary</Button>
            </PageHeader>


            <h1>Projects</h1>
            <Button onClick={() => alert("primary")} className="btn-primary">Primary</Button>
            <Button onClick={() => alert("secondary")} className="btn-secondary">Secondary</Button>
            <Button onClick={() => alert("success")} className="btn-success">Success</Button>
            <Button onClick={() => alert("danger")} className="btn-danger">Danger</Button>
        </div>
    )
}

export default Projects;