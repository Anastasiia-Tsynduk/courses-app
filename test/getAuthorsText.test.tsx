import getAuthorsText, { Author } from "../src/helpers/getAuthorsText";

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
