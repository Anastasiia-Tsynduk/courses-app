import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input conponent", () => {
    let handleChange: jest.Mock;

    const defaultProps = {
        labelText: "Email",
        placeholderText: "Enter email",
        value: "",
        onChange: () => {},
    };

    beforeEach(() => {
        handleChange = jest.fn();
        render(
            <Input
                {...defaultProps}
                onChange={handleChange}
                variant="auth"
                errorMessage="Email is required"
            />
        );
    });

    test("checks if label text is rendered", () => {
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    test("checks if placeholder is rendered", () => {
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    });

    test("checks if input is rendered ", () => {
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
    test("checks if onChange event works", async () => {
        const value = "test";
        await userEvent.type(screen.getByRole("textbox"), value);
        expect(handleChange).toHaveBeenCalledTimes(value.length);
    });
    test("checks if variant transforms to right class name", () => {
        expect(screen.getByRole("textbox").parentElement).toHaveClass(
            "input-auth"
        );
    });
    test("checks if error message works correctly", () => {
        expect(screen.getByText("Email is required")).toBeInTheDocument;
    });
    test("checks error class when errorMessage exists", () => {
        expect(screen.getByRole("textbox").parentElement).toHaveClass(
            "has-error"
        );
    });
});
