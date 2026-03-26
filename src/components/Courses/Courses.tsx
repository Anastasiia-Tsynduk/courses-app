import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";
import CourseCard from "./components/CourseCard/CourseCard";

import "./Courses.css";

import { Author } from "../../models/Author";
import { Course } from "../../models/Course";
import DropdownList from "@/common/DropdownList/DropdownList";
import Button from "@/common/Button/Button";

type CoursesProps = {
    authors: Author[];
    courses: Course[];
};

const Courses: React.FC<CoursesProps> = ({ authors, courses }) => {
    if (courses.length === 0) return <EmptyCourseList />;

    const [description, setDescription] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [duration, setDuration] = useState("");
    const [title, setTitle] = useState("");

    const [filteredCourses, setFilteredCourses] = useState(courses);

    useEffect(() => {
        setFilteredCourses(courses);
    }, [courses]);

    async function handleApplyFilters(e: React.FormEvent) {
        e.preventDefault();

        const params = new URLSearchParams();
        if (duration) params.append("duration", duration);
        if (creationDate) params.append("creationDate", creationDate);
        if (description) params.append("description", description);
        if (title) params.append("title", title);

        const response = await fetch(
            `http://localhost:4000/courses/filter?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error("Courses not found");
        }

        const data = await response.json();

        setFilteredCourses(data.result);
    }

    const resetFilters = () => {
        setDescription("");
        setCreationDate("");
        setDuration("");
        setTitle("");
        setFilteredCourses(courses);
    };

    return (
        <div className="courses-container">
            <div className="form-and-create-button">
                <form className="filter-form" onSubmit={handleApplyFilters}>
                    <div className="filters">
                        <DropdownList
                            value={duration}
                            onChange={setDuration}
                            labelText="Duration"
                            optionValues={courses.map((course) =>
                                course.duration.toString()
                            )}
                        />
                        <DropdownList
                            value={creationDate}
                            onChange={setCreationDate}
                            labelText="Creation date"
                            optionValues={courses.map(
                                (course) => course.creationDate
                            )}
                        />
                        <DropdownList
                            value={description}
                            onChange={setDescription}
                            labelText="Description"
                            optionValues={courses.map(
                                (course) => course.description
                            )}
                        />
                        <DropdownList
                            value={title}
                            onChange={setTitle}
                            labelText="Title"
                            optionValues={courses.map((course) => course.title)}
                        />
                    </div>
                    <div className="filter-buttons">
                        <Button type="submit" buttonText="Apply filters" />
                        <Button
                            type="button"
                            buttonText="Reset"
                            onClick={resetFilters}
                        />
                    </div>
                </form>

                <Link to="/courses/add" className="link create-course-button">
                    create course
                </Link>
            </div>

            {filteredCourses.length === 0 ? (
                <p className="no-courses">No courses match the filter!</p>
            ) : (
                filteredCourses.map((course) => {
                    return (
                        <CourseCard
                            key={course.id}
                            course={course}
                            authors={authors}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Courses;
