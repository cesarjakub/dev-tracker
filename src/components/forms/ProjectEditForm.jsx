const ProjectEditForm = ({ description, setDescription, wiki, setWiki }) => {
    return (
        <div className="form edit-fields">
            <div className="form-group">
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe what this project is about..."
                />
            </div>
            <div className="form-group">
                <label>Wiki</label>
                <textarea
                    className="wiki-textarea"
                    value={wiki}
                    onChange={(e) => setWiki(e.target.value)}
                    placeholder="Detailed documentation, links, etc."
                />
            </div>
        </div>
    )
}

export default ProjectEditForm