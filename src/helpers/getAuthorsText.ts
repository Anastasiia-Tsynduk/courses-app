import { Author } from "../models/Author";

const getAuthorsText = (authorIds: string[], allAuthors: Author[]) =>
    authorIds
        .map((id) => allAuthors.find((author) => author.id === id)?.name)
        .filter(Boolean)
        .join(", ");

export default getAuthorsText;
