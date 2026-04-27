import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import {useState} from "react";
import Modal from "../components/Modal.jsx";
import {ICONS} from "../constants/icons.js";
import ProjectForm from "../components/forms/ProjectForm.jsx";
import {useProject} from "../hooks/useProject.js";
import ProjectCard from "../components/ProjectCard.jsx";

const Projects = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const { projects, addProject, deleteProject } = useProject();

    const handleSubmit = (data) => {
        addProject(data);
        setAddModalOpen(false);
    };

    return (
        <div className="projects">
            <PageHeader>
                <h1>Projects</h1>
                <Button onClick={() => setAddModalOpen(true)} icon={ICONS.ADD} iconAlt="add icon" className="btn-primary">Create</Button>
            </PageHeader>

            {addModalOpen && (
                <Modal title="Create project" onClose={() => setAddModalOpen(false)}>
                    <ProjectForm onSubmit={handleSubmit} projects={projects} />
                </Modal>
            )}
            <div className="projects-wrapper">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} onDelete={deleteProject} />
                ))}
            </div>
        </div>
    )
}

export default Projects;