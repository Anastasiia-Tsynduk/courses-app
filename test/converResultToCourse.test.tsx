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
