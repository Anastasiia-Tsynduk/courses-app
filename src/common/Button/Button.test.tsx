import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Buttom component", () => {
    // 1. Component render
    test("render button text", () => {
        render(<Button buttonText="Click me" />);
        expect(screen.getByText("Click me")).toBeInTheDocument;
    });
    //2. onClick
    test("onClick event", () => {
        const handleClick = jest.fn();
        render(<Button buttonText="Click me" onClick={handleClick} />);
        fireEvent.click(screen.getByText("Click me"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    //3. type attribute
    it.each(["button", "submit", "reset"] as const)(
        "renders button with correct type",
        (type) => {
            render(<Button buttonText="Click me" type={type} />);
            expect(screen.getByText("Click me")).toHaveAttribute("type", type);
        }
    );

    //4. inline styles
    it.each([
        {
            width: "100px",
            height: "50px",
            padding: "10px",
            borderRadius: "5px",
        },
        {
            width: "120px",
            height: "60px",
            padding: "12px 24px",
            borderRadius: "10px",
        },
        {
            width: "200px",
            height: "80px",
            padding: "16px",
            borderRadius: "20px",
        },
    ])("renders button with correct styles", (style) => {
        render(<Button buttonText="Click me" {...style} />);
        expect(screen.getByText("Click me")).toHaveStyle(style);
    });

    //5. class
    it.each(["", "my-class"])(
        "renders button with correct className",
        (classNameProp) => {
            render(<Button buttonText="Click me" className={classNameProp} />);
            expect(screen.getByText("Click me")).toHaveClass(
                `button ${classNameProp}`
            );
        }
    );
});
