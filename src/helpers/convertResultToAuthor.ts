import { Author } from "@/models/Author";

const convertResultToAuthor = (responseJson: any): Author => {
    const result = responseJson.result;
    return {
        name: result.name,
        id: result.id,
    };
};

export default convertResultToAuthor;
