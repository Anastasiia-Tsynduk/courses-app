import Button from "@/common/Button/Button";
import Input from "@/common/Input/Input";
import AuthorsSection from "../CreateCourse/AuthorsSection/AuthorsSection";
import { Author } from "@/models/Author";
import getCourseDuration from "@/helpers/getCourseDuration";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./CreateEditCourse.css";

type CreateEditCourseProps = {
    heading: string;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    duration: string;
    setDuration: React.Dispatch<React.SetStateAction<string>>;
    courseAuthors: Author[];
    setCourseAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
    existedAuthors: Author[];
    setExistedAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
    buttonText: string;
    cleanupForm: () => void;
    performCourseActionInBackEnd: () => void;
};

const CreateEditCourse: React.FC<CreateEditCourseProps> = ({
    heading,
    title,
    setTitle,
    description,
    setDescription,
    duration,
    setDuration,
    courseAuthors,
    setCourseAuthors,
    existedAuthors,
    setExistedAuthors,
    buttonText,
    cleanupForm,
    performCourseActionInBackEnd,
}) => {
    const noErrorsState = {
        title: "",
        description: "",
        duration: "",
        authors: "",
    };

    const navigate = useNavigate();
    const [errors, setErrors] = useState(noErrorsState);

    const processErrors = () => {
        const newErrors = {
            title:
                title.trim().length < 2
                    ? "Title is required and should be at least 2 characters"
                    : "",
            description:
                description.trim().length < 2
                    ? "Description is required and should be at least 2 characters"
                    : "",
            duration:
                Number(duration) < 1
                    ? "Duration is required and should be greater than 0"
                    : "",
            authors: courseAuthors.length === 0 ? "Author list is empty" : "",
        };

        setErrors(newErrors);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        new Promise(() => {
            processErrors();
            if (Object.values(errors).some((err) => err !== "")) {
                return;
            }
        }).then(() => {
            performCourseActionInBackEnd();
            cleanupFormAndErrors();
            navigate("/courses");
        });
    };

    const cleanupFormAndErrors = () => {
        cleanupForm();
        setErrors(noErrorsState);
    };

    const formattedDuration = getCourseDuration(Number(duration));
    return (
        <div className="create-course-wrapper">
            <h2>{heading}</h2>
            <div className="create-course-container">
                <form onSubmit={handleSubmit}>
                    <div className="main-container">
                        <h3>Main info</h3>
                        <Input
                            labelText="Title"
                            placeholderText="Enter course name"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (errors.title)
                                    setErrors((previousErrors) => ({
                                        ...previousErrors,
                                        title: "",
                                    }));
                            }}
                            type="text"
                            errorMessage={errors.title}
                            variant="default"
                        />
                        <div
                            className={`description-container ${
                                errors.description ? "has-error" : ""
                            }`}
                        >
                            <label htmlFor="course-description">
                                Description
                            </label>
                            <textarea
                                id="course-description"
                                placeholder="Enter course description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (errors.description)
                                        setErrors((previousErrors) => ({
                                            ...previousErrors,
                                            description: "",
                                        }));
                                }}
                            />
                            {errors.description && (
                                <p className="error-message">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="duration-container">
                        <h3>Duration</h3>
                        <div className="duration">
                            <Input
                                labelText="Duration"
                                placeholderText="Enter duration"
                                value={duration}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^\d*$/.test(val)) {
                                        setDuration(val);
                                        if (errors.duration) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                duration: "",
                                            }));
                                        }
                                    }
                                }}
                                type="text"
                                errorMessage={errors.duration}
                                variant="small"
                            />
                            <p>
                                {Number(duration) > 0
                                    ? formattedDuration
                                    : "Please enter course duration"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <AuthorsSection
                            setExistedAuthors={setExistedAuthors}
                            existedAuthors={existedAuthors}
                            courseAuthors={courseAuthors}
                            setCourseAuthors={setCourseAuthors}
                            setErrors={setErrors}
                        />
                    </div>
                    <div className="create-course-action">
                        <Button
                            buttonText="CANCEL"
                            type="button"
                            width="18.5rem"
                            onClick={cleanupFormAndErrors}
                        />
                        <Button
                            buttonText={buttonText}
                            type="submit"
                            width="18.5rem"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEditCourse;
