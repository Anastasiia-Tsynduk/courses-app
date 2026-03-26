import { AuthorRequest } from "./AuthorRequest";

export type UpdateAuthorPayload = {
    author: AuthorRequest;
    id: string;
};
