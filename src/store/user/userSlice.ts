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

    const user =
        userString && userString.trim().startsWith("{")
            ? JSON.parse(userString)
            : { name: "", email: "" };

    return {
        isAuth: !!token,
        name: user.name || "",
        email: user.email || "",
        token: token || "",
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
        logout() {
            return { isAuth: false, name: "", email: "", token: "" };
        },
    },
    extraReducers: (builder) =>
        builder.addCase(logoutAsync.fulfilled, () => {}),
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
