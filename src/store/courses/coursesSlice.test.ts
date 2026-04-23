import { Course } from "@/models/Course";
import reducer, {
    addAllCoursesAsync,
    addCourse,
    addCourseAsync,
    deleteCourse,
    deleteCourseAsync,
    updateCourse,
    updateCourseAsync,
} from "./coursesSlice";

const mockCourse: Course = {
    id: "1",
    title: "React",
    description: "Description about React",
    creationDate: "22.01.2026",
    duration: 50,
    authors: ["John", "Smith"],
};

describe("courses initial state", () => {
    test("check if initial state is empty array", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual([]);
    });
});

describe("courses reducers", () => {
    test("check if course is added to state", () => {
        const state: Course[] = [];

        const result = reducer(state, addCourse(mockCourse));

        expect(result).toEqual([mockCourse]);
    });

    test("check if course is removed from state", () => {
        const state: Course[] = [mockCourse];

        const result = reducer(state, deleteCourse(mockCourse.id));

        expect(result).toEqual([]);
    });

    test("check if course is updated from state", () => {
        const state: Course[] = [mockCourse];

        const updatedCourse = {
            id: "1",
            title: "React",
            description: "Description about Angular",
            creationDate: "22.01.2026",
            duration: 50,
            authors: ["John", "Smith"],
        };

        const result = reducer(state, updateCourse(updatedCourse));

        expect(result).toEqual([updatedCourse]);
    });
});

describe("courses reducers", () => {
    test("check if courses are loaded when fetch succeeds", () => {
        const courses: Course[] = [
            mockCourse,
            {
                id: "2",
                title: "Angular",
                description: "Description about Angular",
                creationDate: "22.01.2026",
                duration: 50,
                authors: ["John", "Smith"],
            },
        ];

        const action = {
            type: addAllCoursesAsync.fulfilled.type,
            payload: courses,
        };

        const result = reducer([], action);

        expect(result).toEqual(courses);
    });

    test("check if course is added", () => {
        const state: Course[] = [mockCourse];

        const newCourse: Course = {
            id: "2",
            title: "Angular",
            description: "Description about Angular",
            creationDate: "22.01.2026",
            duration: 50,
            authors: ["John", "Smith"],
        };

        const action = {
            type: addCourseAsync.fulfilled.type,
            payload: newCourse,
        };

        const result = reducer(state, action);

        expect(result).toEqual([...state, newCourse]);
    });

    test("check if course is removed", () => {
        const state: Course[] = [mockCourse];

        const action = {
            type: deleteCourseAsync.fulfilled.type,
            payload: mockCourse.id,
        };

        const result = reducer(state, action);

        expect(result).toEqual([]);
    });

    test("check if course is updated", () => {
        const state: Course[] = [mockCourse];

        const updatedCourse: Course = {
            id: "1",
            title: "React",
            description: "Description about React",
            creationDate: "22.02.2026",
            duration: 100,
            authors: ["John"],
        };

        const action = {
            type: updateCourseAsync.fulfilled.type,
            payload: updatedCourse,
        };

        const result = reducer(state, action);

        expect(result).toEqual([updatedCourse]);
    });
});
