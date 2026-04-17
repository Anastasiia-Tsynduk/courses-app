import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input conponent", () => {
    let handleChange: jest.Mock;

    const renderInput = (props = {}) => {
        return render(
            <Input {...defaultProps} {...props} onChange={handleChange} />
        );
    };

    const variantMap = {
        auth: "input-auth",
        default: "input-default",
        small: "input-small",
    };

    const defaultProps = {
        labelText: "Email",
        placeholderText: "Enter email",
        value: "",
        onChange: () => {},
        errorMessage: "Email is required",
    };

    beforeEach(() => {
        handleChange = jest.fn();
    });

    afterEach(() => {
        cleanup();
    });

    test("checks if label text is rendered", () => {
        renderInput();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    test("checks if placeholder is rendered", () => {
        renderInput();
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    });

    test("checks if input is rendered ", () => {
        renderInput();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("checks if onChange event works", async () => {
        renderInput();
        const value = "test";
        await userEvent.type(screen.getByRole("textbox"), value);
        expect(handleChange).toHaveBeenCalledTimes(value.length);
    });

    test.each(["auth", "default", "small"] as const)(
        "check if variat has appropriate className",
        (variant) => {
            const className = variantMap[variant];
            renderInput({
                variant,
                errorMessage: "Email is required",
            });
            expect(screen.getByRole("textbox").parentElement).toHaveClass(
                className
            );
        }
    );
    test("checks if error message works correctly", () => {
        renderInput();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
    test("checks error class when errorMessage exists", () => {
        renderInput();
        expect(screen.getByRole("textbox").parentElement).toHaveClass(
            "has-error"
        );
    });
});
