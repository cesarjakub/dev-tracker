import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";

const Projects = () => {
    return (
        <div className="projects">
            <PageHeader>
                <h1>Projects</h1>
                <Button onClick={() => alert("primary")} className="btn-primary">Primary</Button>
            </PageHeader>
        </div>
    )
}

export default Projects;