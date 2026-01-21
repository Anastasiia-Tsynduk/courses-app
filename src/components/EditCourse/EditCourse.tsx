import { Author } from "@/helpers/Author";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCourseAsync } from "@/store/courses/coursesSlice";
import transformCourseFromUiToApi from "@/helpers/transformCourseFromUiToApi";
import CreateEditCourse from "../CreateEditCourse/CreateEditCourse";

const EditCourse: React.FC = () => {
    const dispatch = useDispatch();

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

    const updateCourseInBackend = () => {
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
    };

    return (
        <CreateEditCourse
            heading="Edit page"
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            duration={duration}
            setDuration={setDuration}
            courseAuthors={courseAuthors}
            setCourseAuthors={setCourseAuthors}
            existedAuthors={existedAuthors}
            setExistedAuthors={setExistedAuthors}
            buttonText="UPDATE"
            cleanupForm={cleanupForm}
            performCourseActionInBackEnd={updateCourseInBackend}
        />
    );
};

export default EditCourse;
