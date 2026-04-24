import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isAuth: boolean;
    name: string;
    email: string;
    token: string;
}

export const logoutAsync = createAsyncThunk("user/logout", async () => {
    const response = await fetch("http://localhost:4000/logout", {
        method: "DELETE",
        headers: {
            Authorization: localStorage.getItem("token") ?? "",
        },
    });
    if (!response.ok) {
        throw new Error("Error logouting");
    }
});

const getUserFromLocalStorage = (): UserState => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    const isCorrectUser =
        userString != null && userString.trim().startsWith("{");

    const user = isCorrectUser
        ? JSON.parse(userString)
        : { name: "", email: "" };

    return {
        isAuth: !!token && isCorrectUser,
        name: user.name || "",
        email: user.email || "",
        token: !isCorrectUser ? "" : token || "",
    };
};

const userSlice = createSlice({
    name: "user",
    initialState: getUserFromLocalStorage,
    reducers: {
        login(currentState, action: PayloadAction<Partial<UserState>>) {
            const updatedState = {
                ...currentState,
                ...action.payload,
                isAuth: true,
            };
            return updatedState;
        },
    },
    extraReducers: (builder) =>
        builder.addCase(logoutAsync.fulfilled, () => {
            return { isAuth: false, name: "", email: "", token: "" };
        }),
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
