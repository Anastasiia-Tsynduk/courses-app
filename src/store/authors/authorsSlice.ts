import { AuthorRequest } from "@/helpers/AuthorRequest";
import { Author } from "../../helpers/Author";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/authors";

const authorsInitialState: Author[] = [];

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

const authorsSlice = createSlice({
    name: "authors",
    initialState: authorsInitialState,
    reducers: {
        setAuthors(_currentState, action: PayloadAction<Author[]>) {
            return action.payload;
        },
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
            .addCase(addAuthorAsync.fulfilled, (currentState, action) => {
                return [...currentState, action.payload];
            })
            .addCase(removeAuthorAsync.fulfilled, (currentState, action) => {
                return currentState.filter(
                    (course) => course.id !== action.payload
                );
            });
    },
});

export const { setAuthors, addAuthor, removeAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
