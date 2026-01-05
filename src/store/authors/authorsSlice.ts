import { Author } from "../../helpers/getAuthorsText";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/authors";

const authorsInitialState: Author[] = [];

export const addAuthorAsync = createAsyncThunk(
    "authors/addAuthorsAsync",
    async (author: Author) => {
        console.log(JSON.stringify(author));
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
        return author;
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
        builder.addCase(addAuthorAsync.fulfilled, (currentState, action) => {
            return [...currentState, action.payload];
        });
    },
});

export const { setAuthors, addAuthor, removeAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
