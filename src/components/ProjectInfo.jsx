const ProjectInfo = ({ description, wiki }) => {
    return (
        <div className="view-fields">
            <section className="info-block">
                <h3>Description</h3>
                <p>{description || "No description provided."}</p>
            </section>
            <section className="info-block">
                <h3>Wiki</h3>
                <div className="wiki-content">{wiki || "No wiki yet."}</div>
            </section>
        </div>
    )
}

export default ProjectInfo