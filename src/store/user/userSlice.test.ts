import reducer, { login, logoutAsync } from "./userSlice";

const user = {
    isAuth: true,
    name: "Nastya",
    email: "dfd@dgfd",
    token: "hj",
};

const emptyUser = {
    isAuth: false,
    name: "",
    email: "",
    token: "",
};

describe("user initial state from local storage", () => {
    test("check if initial state is null", () => {
        localStorage.setItem("token", user.token);
        const result = reducer(undefined, { type: "unknown" });
        expect(result).toEqual(emptyUser);
    });

    test("check if initial state is object", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({ name: user.name, email: user.email })
        );
        localStorage.setItem("token", user.token);
        const result = reducer(undefined, { type: "unknown" });
        expect(result).toEqual(user);
    });

    test("check if initial state is not an object", () => {
        localStorage.setItem("user", "Hello");
        localStorage.setItem("token", user.token);
        const result = reducer(undefined, { type: "unknown" });
        expect(result).toEqual(emptyUser);
    });

    afterEach(() => {
        localStorage.clear();
    });
});

describe("user reducer", () => {
    test("check if user is login", () => {
        const result = reducer(emptyUser, login(user));
        expect(result).toEqual(user);
    });

    test("check if user is login partial", () => {
        const partialUser = { name: user.name, email: user.email };
        const result = reducer(emptyUser, login(partialUser));
        expect(result).toEqual({ ...emptyUser, ...partialUser, isAuth: true });
    });
});

describe("user extra reducer", () => {
    test("check if user logout", () => {
        const action = {
            type: logoutAsync.fulfilled.type,
        };

        const result = reducer(user, action);

        expect(result).toEqual(emptyUser);
    });
});
