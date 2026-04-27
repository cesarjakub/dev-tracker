import React, {useEffect, useState} from 'react';
import router from "./router/index.js";
import Sidebar from "./components/Sidebar.jsx";
import { SessionTimerProvider } from "./context/SessionTimerContext.jsx";
import MobileNavBar from "./components/MobileNavBar.jsx";
import "./components/CustomLayout.js";

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
            <custom-layout>
                <div slot="nav">
                    <Sidebar />
                    <MobileNavBar />
                </div>
                <main className="content">
                    <Component/>
                </main>
            </custom-layout>
        </SessionTimerProvider>
    );
}

export default App;