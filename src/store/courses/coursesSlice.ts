import { Course } from "../../helpers/Course";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const coursesInitialState: Course[] = [];

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
});

export const { setCourses, deleteCourse, addCourse, updateCourse } =
    coursesSlice.actions;

export default coursesSlice.reducer;
