import reducer, {
    addAuthor,
    removeAuthor,
    addAllAuthorsAsync,
    updateAuthorAsync,
    removeAuthorAsync,
    addAuthorAsync,
} from "./authorsSlice";

import { Author } from "@/models/Author";

const mockAuthor: Author = {
    id: "1",
    name: "John Doe",
};

describe("authors initial state", () => {
    test("check if initial state is empty array", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual([]);
    });
});

describe("authors reducers", () => {
    test("check if author is added to state", () => {
        const state: Author[] = [];

        const result = reducer(state, addAuthor(mockAuthor));

        expect(result).toEqual([mockAuthor]);
    });

    test("check if author is removed from state", () => {
        const state: Author[] = [mockAuthor];

        const result = reducer(state, removeAuthor(mockAuthor.id));

        expect(result).toEqual([]);
    });
});

describe("authors extraReducers", () => {
    test("check if authors are loaded when fetch succeeds", () => {
        const authors: Author[] = [mockAuthor, { id: "2", name: "Kate" }];

        const action = {
            type: addAllAuthorsAsync.fulfilled.type,
            payload: authors,
        };

        const result = reducer([], action);

        expect(result).toEqual(authors);
    });

    test("check if author is updated when update succeeds", () => {
        const state: Author[] = [mockAuthor];

        const updatedAuthor: Author = { id: mockAuthor.id, name: "Johnny" };

        const action = {
            type: updateAuthorAsync.fulfilled.type,
            payload: updatedAuthor,
        };

        const result = reducer(state, action);

        expect(result).toEqual([updatedAuthor]);
    });

    test("check if author is removed when removed succeeds", () => {
        const state: Author[] = [mockAuthor];

        const action = {
            type: removeAuthorAsync.fulfilled.type,
            payload: mockAuthor.id,
        };

        const result = reducer(state, action);

        expect(result).toEqual([]);
    });
    test("check if author is added when fetch succeeds", () => {
        const state: Author[] = [mockAuthor];

        const newAuthor: Author = { id: "2", name: "Smit" };

        const action = {
            type: addAuthorAsync.fulfilled.type,
            payload: newAuthor,
        };

        const result = reducer(state, action);

        expect(result).toEqual([...state, newAuthor]);
    });
});
