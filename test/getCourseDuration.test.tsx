import getCourseDuration from "@/helpers/getCourseDuration";

test.each([
    [60, "01:00 hour"],
    [600, "10:00 hours"],
    [90, "01:30 hour"],
    [50, "00:50 hours"],
    [1, "00:01 hours"],
    [0, "00:00 hours"],
])("checks conversion of duration", (duration, result) => {
    expect(getCourseDuration(duration)).toBe(result);
});
