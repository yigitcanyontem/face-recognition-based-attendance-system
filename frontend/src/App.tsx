import './App.css'
import {HashRouter, Route, Routes} from 'react-router-dom';
import Face from "./pages/Face.tsx";
import Login from "@/pages/Login.tsx";
import {ThemeProvider} from "@/components/theme-proivder.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import Header from "@/shared/layout/Header.tsx";
import Student from "@/pages/Student.tsx";
import Teacher from "@/pages/Teacher.tsx";
import Lesson from "@/pages/Lesson.tsx";
import Lecture from "@/pages/Lecture.tsx";

function App() {

    return (

        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <HashRouter>
                <Header/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/teacher" element={<Teacher/>}/>
                    <Route path="/student" element={<Student/>}/>
                    <Route path="/attendance/:id" element={<Face/>}/>
                    <Route path="/course/:id" element={<Lesson/>}/>
                    <Route path="/lecture/:id" element={<Lecture/>}/>
                    <Route path="*" element={<div>404</div>}/>
                </Routes>
            </HashRouter>
            <Toaster />
        </ThemeProvider>

    )
}

export default App
