import transformCourseFromUiToApi from "@/helpers/transformCourseFromUiToApi";
import { CourseRuquest } from "@/models/CourseRequest";

test("checks if course transform from ui to api", () => {
    var expectedCourse: CourseRuquest = {
        title: "df",
        description: "sdf",
        duration: 12,
        authors: ["108d1845-73af-4483-a326-f9920b833a2d"],
    };

    var actualCourse = transformCourseFromUiToApi("df", "sdf", "12", [
        {
            id: "108d1845-73af-4483-a326-f9920b833a2d",
            name: "vasya",
        },
    ]);

    expect(actualCourse).toStrictEqual(expectedCourse);
});
