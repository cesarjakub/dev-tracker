import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";

const Calendar = () => {
    return (
        <div className="calendar">
            <PageHeader>
                <h1>Calendar</h1>
                <Button onClick={() => alert("success")} className="btn-success">Success</Button>
            </PageHeader>
        </div>
    )
}

export default Calendar