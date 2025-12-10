import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import getCourseDuration from "../../helpers/getCourseDuration";
import formatCreationDate from "../../helpers/formatCreationDate";
import getAuthorsText from "../../helpers/getAuthorsText";

import { BUTTON_BACK } from "../../constants";

import "./CourseInfo.css";

import { RootState } from "@/store";

const CourseInfo: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();

    const courses = useSelector((state: RootState) => state.courses);
    const authors = useSelector((state: RootState) => state.authors);

    if (!courseId) return;
    const course = courses.find((course) => course.id === courseId);

    const formattedDuration = getCourseDuration(course?.duration ?? 0);
    const formattedDate = formatCreationDate(course?.creationDate ?? "");
    const authorsText = getAuthorsText(course?.authors ?? [], authors);

    return (
        <div className="course-info-wrapper">
            <h2>{course?.title}</h2>
            <div className="course-info-container">
                <div className="description-section">
                    <p className="description-title">Description:</p>
                    <p className="description">{course?.description}</p>
                </div>
                <div className="course-details">
                    <p className="course-item">
                        <span className="item-label">ID:</span>
                        <span className="item-value">{course?.id}</span>
                    </p>
                    <p className="course-item">
                        <span className="item-label">Duration:</span>
                        <span className="item-value">{formattedDuration}</span>
                    </p>
                    <p className="course-item">
                        <span className="item-label">Created:</span>
                        <span className="item-value">{formattedDate}</span>
                    </p>
                    <p className="course-item">
                        <span className="item-label">Authors:</span>
                        <span className="item-value">{authorsText}</span>
                    </p>
                </div>
            </div>
            <Link to="/courses" className="link back">
                {BUTTON_BACK}
            </Link>
        </div>
    );
};

export default CourseInfo;
