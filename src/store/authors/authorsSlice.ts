import { Author } from "../../helpers/getAuthorsText";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authorsInitialState: Author[] = [];

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
});

export const { setAuthors, addAuthor, removeAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
