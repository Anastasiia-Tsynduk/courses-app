import { Course } from "./Course";

const converResultToCourse = (responseJson: any): Course => {
    const result = responseJson.result;
    return {
        title: result.title,
        description: result.description,
        duration: result.duration,
        authors: result.authors,
        creationDate: result.creationDate,
        id: result.id,
    };
};

export default converResultToCourse;
