import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../../../common/Button/Button";

import getCourseDuration from "../../../../helpers/getCourseDuration";
import formatCreationDate from "../../../../helpers/formatCreationDate";
import getAuthorsText, { Author } from "../../../../helpers/getAuthorsText";
import { Course } from "../../../../helpers/Course";

import { BUTTON_SHOW_COURSE } from "../../../../constants";

import "./CourseCard.css";

import { deleteCourseAsync } from "../../../../store/courses/coursesSlice";
import { AppDispatch } from "@/store";

type CourseCardProps = {
    course: Course;
    authors: Author[];
};

const CourseCard: React.FC<CourseCardProps> = ({ course, authors }) => {
    const dispatch = useDispatch();
    const formattedDuration = getCourseDuration(course.duration);
    const formattedDate = formatCreationDate(course.creationDate);
    const authorsText = getAuthorsText(course.authors, authors);

    const handleDelete = () => {
        (dispatch as AppDispatch)(deleteCourseAsync(course.id));
    };

    return (
        <div className="course_card">
            <h2>{course.title}</h2>
            <div className="card">
                <div className="card-content">
                    <p>{course.description}</p>
                </div>
                <div>
                    <div className="card-details">
                        <p className="course-authors">
                            <span className="label">Authors:</span>{" "}
                            <span className="value">{authorsText}</span>
                        </p>
                        <p>
                            <span className="label">Duration:</span>
                            <span className="value">{formattedDuration}</span>
                        </p>
                        <p>
                            <span className="label">Created:</span>
                            <span className="value">{formattedDate}</span>
                        </p>
                    </div>
                    <div className="card-buttons">
                        <Link to={`/courses/${course.id}`} className="link">
                            {BUTTON_SHOW_COURSE}
                        </Link>
                        <Button
                            onClick={handleDelete}
                            buttonText="Delete"
                            width="6rem"
                            height="5rem"
                        />

                        <Link
                            to={`/courses/${course.id}/edit`}
                            className="link"
                        >
                            Update
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
