import Input from "@/common/Input/Input";
import { Author } from "@/helpers/Author";
import getCourseDuration from "@/helpers/getCourseDuration";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AuthorsSection from "../CreateCourse/AuthorsSection/AuthorsSection";
import Button from "@/common/Button/Button";
import { updateCourseAsync } from "@/store/courses/coursesSlice";
import transformCourseFromUiToApi from "@/helpers/transformCourseFromUiToApi";

const EditCourse: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();

    const courses = useSelector((state: RootState) => state.courses);
    const foundCourse = courses.find((course) => course.id === courseId);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");

    const allAuthors = useSelector((state: RootState) => state.authors);
    const [courseAuthors, setCourseAuthors] = useState<Author[]>(
        allAuthors.filter((author) => foundCourse?.authors.includes(author.id))
    );
    const [existedAuthors, setExistedAuthors] = useState<Author[]>([]);
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        duration: "",
        authors: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formattedDuration = getCourseDuration(Number(duration));

    useEffect(() => {
        if (foundCourse) {
            setTitle(foundCourse.title);
            setDescription(foundCourse.description);
            setDuration(String(foundCourse.duration));
            setExistedAuthors(
                allAuthors.filter(
                    (author) => !foundCourse.authors.includes(author.id)
                )
            );
            setCourseAuthors(
                allAuthors.filter((author) =>
                    foundCourse?.authors.includes(author.id)
                )
            );
        }
    }, [foundCourse]);

    const cleanupForm = () => {
        if (foundCourse) {
            setTitle(foundCourse.title);
            setDescription(foundCourse.description);
            setDuration(String(foundCourse.duration));
            setExistedAuthors(
                allAuthors.filter(
                    (author) => !foundCourse.authors.includes(author.id)
                )
            );
            setCourseAuthors(
                allAuthors.filter((author) =>
                    foundCourse?.authors.includes(author.id)
                )
            );
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

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

        if (Object.values(newErrors).some((err) => err !== "")) {
            return;
        }

        const updatedCourse = transformCourseFromUiToApi(
            title,
            description,
            duration,
            courseAuthors
        );

        const updateCoursePayload = {
            course: updatedCourse,
            id: courseId ?? "",
        };

        (dispatch as AppDispatch)(updateCourseAsync(updateCoursePayload));

        cleanupForm();
        navigate("/courses");
    };

    return (
        <div className="create-course-wrapper">
            <h2>Course edit</h2>
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
                            onClick={cleanupForm}
                        />
                        <Button
                            buttonText="EDIT COURSE"
                            type="submit"
                            width="18.5rem"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCourse;
