import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Author } from "../../helpers/Author";

import { addCourseAsync } from "../../store/courses/coursesSlice";
import { AppDispatch, RootState } from "@/store";

import transformCourseFromUiToApi from "@/helpers/transformCourseFromUiToApi";
import CreateEditCourse from "../CreateEditCourse/CreateEditCourse";

const CreateCourse: React.FC = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");

    const allAuthors = useSelector((state: RootState) => state.authors);
    const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);
    const [existedAuthors, setExistedAuthors] = useState(allAuthors);

    useEffect(() => {
        setExistedAuthors(
            allAuthors.filter((author) => !courseAuthors.includes(author))
        );
    }, [allAuthors]);

    const cleanupForm = () => {
        setTitle("");
        setDescription("");
        setDuration("");
        setCourseAuthors([]);
        setExistedAuthors(allAuthors);
    };

    const createCourseInBackend = () => {
        const newCourse = transformCourseFromUiToApi(
            title,
            description,
            duration,
            courseAuthors
        );

        (dispatch as AppDispatch)(addCourseAsync(newCourse));
    };

    return (
        <CreateEditCourse
            heading="Create page"
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
            buttonText="CREATE COURSE"
            cleanupForm={cleanupForm}
            performCourseActionInBackEnd={createCourseInBackend}
        />
    );
};

export default CreateCourse;
