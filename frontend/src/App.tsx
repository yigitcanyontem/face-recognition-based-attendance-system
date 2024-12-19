import './App.css'
import {HashRouter, Route, Routes} from 'react-router-dom';
import Face from "./pages/Face.tsx";

function App() {

    return (
            <HashRouter>
                <Routes>
                    <Route path="/face" element={<Face />} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </HashRouter>
    )
}

export default App
