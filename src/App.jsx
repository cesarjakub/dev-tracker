import React, {useEffect, useState} from 'react';
import router from "./router/index.js";
import Sidebar from "./components/Sidebar.jsx";
import { SessionTimerProvider } from "./context/SessionTimerContext.jsx";

function App() {
    const [Component, setComponent] = useState(() => router.getComponent());

    useEffect(() => {
        router.start();

        router.subscribe(() => {
            setComponent(() => router.getComponent())
        })
    }, []);

    return (
        <SessionTimerProvider>
            <div className="layout">
                <Sidebar/>
                <main className="content">
                    <Component/>
                </main>
            </div>
        </SessionTimerProvider>
    );
}

export default App;