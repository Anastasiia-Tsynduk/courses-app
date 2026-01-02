import React from "react";

import "./EmptyCourseList.css";
import { Link } from "react-router-dom";

const EmptyCourseList: React.FC = () => {
    return (
        <div className="empty-course">
            <h3>Course List is Empty</h3>
            <p>Please use "Add New Course" button to add your first course</p>
            <Link to="/courses/add" className="link">
                Add New Course
            </Link>
        </div>
    );
};

export default EmptyCourseList;
