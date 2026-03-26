import convertResultToAuthor from "@/helpers/convertResultToAuthor";
import { Author } from "@/models/Author";

test("checks if result convert to author", () => {
    var expectedAuthor: Author = {
        name: "nastya",
        id: "9271ec6f-ee9d-435f-ba86-0a575060737a",
    };

    var responseJson = {
        successful: true,
        result: expectedAuthor,
    };

    var actualActor = convertResultToAuthor(responseJson);

    expect(actualActor).toStrictEqual(expectedAuthor);
});
