import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { AppDispatch, RootState } from "./store";
import { addAllAuthorsAsync } from "./store/authors/authorsSlice";
import { addAllCoursesAsync } from "./store/courses/coursesSlice";
import EditCourse from "./components/EditCourse/EditCourse";

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

function App() {
    const dispatch: AppDispatch = useDispatch();

    const courses = useSelector((state: RootState) => state.courses);
    const authors = useSelector((state: RootState) => state.authors);

    useEffect(() => {
        dispatch(addAllCoursesAsync());
        dispatch(addAllAuthorsAsync());
    }, [dispatch]);

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/registration"
                        element={
                            <PrivateRoute>
                                <Registration />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PrivateRoute>
                                <Login />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/courses"
                        element={
                            <PrivateRoute>
                                <Courses authors={authors} courses={courses} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Courses authors={authors} courses={courses} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/courses/:courseId"
                        element={
                            <PrivateRoute>
                                <CourseInfo />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/courses/add"
                        element={
                            <PrivateRoute>
                                <CreateCourse />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/courses/:courseId/edit"
                        element={
                            <PrivateRoute>
                                <EditCourse />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </main>
        </>
    );
}

export default AppWrapper;
