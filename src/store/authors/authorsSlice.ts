import { AuthorRequest } from "@/models/AuthorRequest";
import { Author } from "../../models/Author";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateAuthorPayload } from "@/models/UpdateAuthorPayload";
import convertResultToAuthor from "@/helpers/convertResultToAuthor";

const API_URL = "http://localhost:4000/authors";

const authorsInitialState: Author[] = [];

export const addAllAuthorsAsync = createAsyncThunk(
    "course/addAllAuthorsAsync",
    async () => {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) {
            throw new Error("Authors not found");
        }
        const responseJson = await response.json();
        return responseJson.result;
    }
);

export const addAuthorAsync = createAsyncThunk(
    "authors/addAuthorAsync",
    async (author: AuthorRequest) => {
        const response = await fetch(`${API_URL}/add`, {
            method: "POST",
            body: JSON.stringify(author),
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
        });
        if (!response.ok) {
            throw new Error("Cannot add the authors");
        }
        const responseJson = await response.json();
        const result = responseJson.result;
        return {
            id: result.id,
            name: result.name,
        };
    }
);

export const removeAuthorAsync = createAsyncThunk(
    "author/deleteAuthorAsync",
    async (id: string) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: localStorage.getItem("token") ?? "",
            },
        });
        if (!response.ok) {
            throw new Error("Cannot delete the course");
        }
        return id;
    }
);

export const updateAuthorAsync = createAsyncThunk(
    "author/updateAuthorAsync",
    async (payload: UpdateAuthorPayload) => {
        const response = await fetch(`${API_URL}/${payload.id}`, {
            method: "PUT",
            body: JSON.stringify(payload.author),
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
        });
        if (!response.ok) {
            throw new Error("Error updating of author");
        }
        const responseJson = await response.json();
        return convertResultToAuthor(responseJson);
    }
);

const authorsSlice = createSlice({
    name: "authors",
    initialState: authorsInitialState,
    reducers: {
        addAuthor(currentState, action: PayloadAction<Author>) {
            return [...currentState, action.payload];
        },
        removeAuthor(currentState, action: PayloadAction<string>) {
            return currentState.filter(
                (author) => author.id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                addAllAuthorsAsync.fulfilled,
                (_currentState, action: PayloadAction<Author[]>) => {
                    return action.payload;
                }
            )
            .addCase(addAuthorAsync.fulfilled, (currentState, action) => {
                return [...currentState, action.payload];
            })
            .addCase(removeAuthorAsync.fulfilled, (currentState, action) => {
                return currentState.filter(
                    (author) => author.id !== action.payload
                );
            })
            .addCase(
                updateAuthorAsync.fulfilled,
                (currentState, action: PayloadAction<Author>) => {
                    return currentState.map((author) =>
                        author.id === action.payload.id
                            ? action.payload
                            : author
                    );
                }
            );
    },
});

export const { addAuthor, removeAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
