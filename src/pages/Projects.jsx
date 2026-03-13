import Button from "../components/Button.jsx";

const Projects = () => {
    return (
        <>
        <h1>Projects</h1>
        <Button onClick={() => alert("primary")} className="btn-primary">Primary</Button>
        <Button onClick={() => alert("secondary")} className="btn-secondary">Secondary</Button>
        <Button onClick={() => alert("success")} className="btn-success">Success</Button>
        <Button onClick={() => alert("danger")} className="btn-danger">Danger</Button>
        </>
    )
}

export default Projects;