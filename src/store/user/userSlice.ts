import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isAuth: boolean;
    name: string;
    email: string;
    token: string;
}

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
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
