import React from "react";
import { Link } from "react-router-dom";

import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import CourseCard from "./components/CourseCard/CourseCard";

import "./Courses.css";

import { Author } from "../../helpers/Author";
import { Course } from "../../helpers/Course";

type CoursesProps = {
    authors: Author[];
    courses: Course[];
};

const Courses: React.FC<CoursesProps> = ({ authors, courses }) => {
    if (courses.length === 0) return <EmptyCourseList />;

    return (
        <div className="courses-container">
            <Link to="/courses/add" className="link">
                create course
            </Link>

            {courses.map((course) => {
                return (
                    <CourseCard
                        key={course.id}
                        course={course}
                        authors={authors}
                    />
                );
            })}
        </div>
    );
};

export default Courses;
