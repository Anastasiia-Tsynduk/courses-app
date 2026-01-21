import { Author } from "@/models/Author";
import getAuthorsText from "../src/helpers/getAuthorsText";
import converResultToCourse from "@/helpers/convertResultToCourse";
import { Course } from "@/models/Course";

test("checks if result convert to course", () => {
    var expectedCourse: Course = {
        title: "df",
        description: "sdf",
        duration: 12,
        authors: ["108d1845-73af-4483-a326-f9920b833a2d"],
        creationDate: "21/01/2026",
        id: "9271ec6f-ee9d-435f-ba86-0a575060737a",
    };
    var responseJson = {
        successful: true,
        result: expectedCourse,
    };

    var actualCourse = converResultToCourse(responseJson);

    expect(actualCourse).toStrictEqual(expectedCourse);
});

test("adds num1 plus num2 equal 3", () => {
    //Arrange
    var authorIds = ["1", "2"];
    var allAuthors = [
        { id: "1", name: "Nastya" },
        { id: "2", name: "John" },
        { id: "3", name: "Kyky" },
    ];

    var expectedAuthrosText = "Nastya, John";

    //Act
    var actualAuthorsText = getAuthorsText(authorIds, allAuthors);

    //Assert

    expect(actualAuthorsText).toBe(expectedAuthrosText);
});

test("checks if authorIds are empty", () => {
    //Arrange
    const authorIds: string[] = [];
    const allAuthors = [
        { id: "1", name: "Nastya" },
        { id: "2", name: "John" },
        { id: "3", name: "Kyky" },
    ];

    const expectedAuthrosText = "";

    //Act
    const actualAuthorsText = getAuthorsText(authorIds, allAuthors);

    //Assert

    expect(actualAuthorsText).toBe(expectedAuthrosText);
});

test("checks if allAuthors are empty", () => {
    const authorIds: string[] = ["1", "2"];
    const allAuthors: Author[] = [];

    const expectedAuthrosText = "";

    //Act
    const actualAuthorsText = getAuthorsText(authorIds, allAuthors);

    //Assert

    expect(actualAuthorsText).toBe(expectedAuthrosText);
});
