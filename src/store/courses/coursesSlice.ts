import { CourseRuquest } from "@/helpers/CourseRequest";
import { Course } from "../../helpers/Course";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/courses";

const coursesInitialState: Course[] = [];

export type UpdateCoursePayload = {
    course: CourseRuquest;
    id: string;
};

export const addCourseAsync = createAsyncThunk(
    "course/addCourseAsync",
    async (course: CourseRuquest) => {
        const response = await fetch(`${API_URL}/add`, {
            method: "POST",
            body: JSON.stringify(course),
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
        });
        if (!response.ok) {
            throw new Error("Error adding of course");
        }
        const responseJson = await response.json();
        const result = responseJson.result;
        return {
            title: result.title,
            description: result.description,
            duration: result.duration,
            authors: result.authors,
            id: result.id,
            creationDate: result.creationDate,
        };
    }
);

export const deleteCourseAsync = createAsyncThunk(
    "course/deleteCourseAsync",
    async (id: string) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: localStorage.getItem("token") ?? "",
            },
        });
        if (!response.ok) {
            throw new Error("Error deleting of course");
        }
        return id;
    }
);

export const updateCourseAsync = createAsyncThunk(
    "course/updateCourseAsync",
    async (payload: UpdateCoursePayload) => {
        const response = await fetch(`${API_URL}/${payload.id}`, {
            method: "PUT",
            body: JSON.stringify(payload.course),
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
            },
        });
        if (!response.ok) {
            throw new Error("Error updating of course");
        }
        const responseJson = await response.json();
        const result = responseJson.result;
        return {
            title: result.title,
            description: result.description,
            duration: result.duration,
            authors: result.authors,
            creationDate: result.creationDate,
            id: result.id,
        };
    }
);

const coursesSlice = createSlice({
    name: "courses",
    initialState: coursesInitialState,
    reducers: {
        setCourses(_currentState, action: PayloadAction<Course[]>) {
            return action.payload;
        },
        deleteCourse(currentState, action: PayloadAction<string>) {
            return currentState.filter(
                (course) => course.id !== action.payload
            );
        },
        addCourse(currentState, action: PayloadAction<Course>) {
            return [...currentState, action.payload];
        },
        updateCourse(currentState, action: PayloadAction<Course>) {
            return currentState.map((course) =>
                course.id === action.payload.id ? action.payload : course
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteCourseAsync.fulfilled, (currentState, action) => {
                return currentState.filter(
                    (course) => course.id !== action.payload
                );
            })
            .addCase(addCourseAsync.fulfilled, (currentState, action) => {
                return [...currentState, action.payload];
            })
            .addCase(
                updateCourseAsync.fulfilled,
                (currentState, action: PayloadAction<Course>) => {
                    return currentState.map((course) =>
                        course.id === action.payload.id
                            ? action.payload
                            : course
                    );
                }
            );
    },
});

export const { setCourses, deleteCourse, addCourse, updateCourse } =
    coursesSlice.actions;

export default coursesSlice.reducer;
