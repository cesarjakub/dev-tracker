import NotFound from "./NotFound.jsx";
import {useEffect, useState} from "react";
import formatDate from "../utils/formatDate.js";
import {useProjectDetail} from "../hooks/useProjectDetail.js";
import {useSessionTimer} from "../hooks/useSessionTimer.js";
import Button from "../components/Button.jsx";
import {ICONS} from "../constants/icons.js";
import ProjectTimer from "../components/ProjectTimer.jsx";
import ReactMarkdown from "react-markdown";

const DESCRIPTION_LIMIT = 100;

const ProjectDetail = () => {
    const { project, updateCurrentProject } = useProjectDetail();
    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState("");
    const [wiki, setWiki] = useState("");

    useEffect(() => {
        if (project) {
            setDescription(project.description || "");
            setWiki(project.wiki || "");
        }
    }, [project]);

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

            <div className={`project-detail-content ${edit ? 'form' : ''}`}>
                <section className="content-section">
                    <div className="section-header">
                        <h3>DESCRIPTION</h3>
                        {edit && (
                            <span className={`char-counter ${description.length >= DESCRIPTION_LIMIT ? 'limit' : ''}`}>
                                {description.length}/{DESCRIPTION_LIMIT}
                            </span>
                        )}
                    </div>

                    {edit ? (
                        <div className="form-group">
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={DESCRIPTION_LIMIT}
                                placeholder="Short summary..."
                            />
                        </div>
                    ) : (
                        <p className="view-text">{project.description || "No description provided."}</p>
                    )}
                </section>

                <section className="content-section">
                    <div className="section-header">
                        <h3>WIKI</h3>
                    </div>

                    {edit ? (
                        <div className="form-group">
                            <textarea
                                className="wiki-textarea"
                                value={wiki}
                                onChange={(e) => setWiki(e.target.value)}
                                placeholder="Detailed documentation..."
                            />
                        </div>
                    ) : (
                        <div className="view-text">
                            {project.wiki ? (
                                <ReactMarkdown>{project.wiki}</ReactMarkdown>
                            ) : (
                                "No wiki yet."
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default ProjectDetail;