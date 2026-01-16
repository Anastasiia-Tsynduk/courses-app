import { Author } from "./Author";

const transformCourseFromUiToApi = (
    title: string,
    description: string,
    duration: string,
    courseAuthors: Author[]
) => {
    return {
        title,
        description,
        duration: Number(duration),
        authors: courseAuthors.map((author) => author.id),
    };
};

export default transformCourseFromUiToApi;
