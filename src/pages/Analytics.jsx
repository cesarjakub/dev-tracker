import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";

const Analytics = () => {
    return (
        <div className="analytics">
            <PageHeader>
                <h1>Analytics</h1>
                <Button onClick={() => alert("secondary")} className="btn-secondary">Secondary</Button>
            </PageHeader>
        </div>
    )
}

export default Analytics;