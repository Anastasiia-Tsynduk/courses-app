import { CourseRuquest } from "../models/CourseRequest";

export type UpdateCoursePayload = {
    course: CourseRuquest;
    id: string;
};
