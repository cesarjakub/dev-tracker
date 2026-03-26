import NotFound from "./NotFound.jsx";
import {useState} from "react";
import formatDate from "../utils/formatDate.js";
import {useProjectDetail} from "../hooks/useProjectDetail.js";
import {useSessionTimer} from "../hooks/useSessionTimer.js";
import Button from "../components/Button.jsx";
import {ICONS} from "../constants/icons.js";
import ProjectTimer from "../components/ProjectTimer.jsx";
import ProjectEditForm from "../components/forms/ProjectEditForm.jsx";
import ProjectInfo from "../components/ProjectInfo.jsx";

const ProjectDetail = () => {
    const { project, updateCurrentProject } = useProjectDetail();
    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState("");
    const [wiki, setWiki] = useState("");

    const { isActive, time, start, stop } = useSessionTimer((seconds) => {
        updateCurrentProject({
            sessionTime: seconds,
            totalTime: (project.totalTime || 0) + seconds,
        });
    });

    if (!project) return <NotFound />;

    const handleEdit = () => {
        if (edit) {
            setEdit(false);
        } else {
            setDescription(project.description || "");
            setWiki(project.wiki || "");
            setEdit(true);
        }
    };

    const handleSave = () => {
        updateCurrentProject({ description, wiki });
        setEdit(false);
    };

    return (
        <div className="project-detail">
            <div className="header">
                <div className="title-area">
                    <div className="title-section">
                        <h1>{project.title}</h1>
                        <p className="project-created">Created: {formatDate(project.date)}</p>
                    </div>

                    <div className="button-group">
                        {edit ?
                            <Button onClick={handleSave} className="btn-success">
                                Save Changes
                            </Button>
                            :
                            <Button onClick={handleEdit} className="btn-primary" icon={ICONS.EDIT} iconAlt="edit icon">
                                Edit Project
                            </Button>
                        }

                    </div>
                </div>

                <div className="timer">
                    <ProjectTimer isActive={isActive} time={time} totalTime={project.totalTime || 0} start={start} stop={stop}/>
                </div>
            </div>

            <div className="content">
                {edit ? (
                    <ProjectEditForm description={description} wiki={wiki} setDescription={setDescription} setWiki={setWiki} />
                ) : (
                    <ProjectInfo description={description} wiki={wiki} />
                )}
            </div>
        </div>
    )
}

export default ProjectDetail;