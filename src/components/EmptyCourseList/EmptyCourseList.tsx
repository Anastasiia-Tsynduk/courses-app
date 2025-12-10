import React from "react";

import Button from "../../common/Button/Button";

import { BUTTON_ADD_COURSE } from "../../constants";

import "./EmptyCourseList.css";

const EmptyCourseList: React.FC = () => {
    return (
        <div className="empty-course">
            <h3>Course List is Empty</h3>
            <p>Please use "Add New Course" button to add your first course</p>
            <Button
                buttonText={BUTTON_ADD_COURSE}
                padding="1rem 2rem"
                width="23.3rem"
            />
        </div>
    );
};

export default EmptyCourseList;
