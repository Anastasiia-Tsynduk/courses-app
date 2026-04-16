import { render, screen } from "@testing-library/react";
import DropdownList from "./DropdownList";
import userEvent from "@testing-library/user-event";

describe("DropdownList component", () => {
    let handleChange: jest.Mock;

    const duplicatedOption = "description";

    const defaultProps = {
        labelText: "description",
        optionValues: [duplicatedOption, duplicatedOption, "description1"],
        value: "",
        onChange: () => {},
    };

    beforeEach(() => {
        handleChange = jest.fn();
        render(<DropdownList {...defaultProps} onChange={handleChange} />);
    });

    test("checks if labelText is rendered", () => {
        expect(
            screen.getByLabelText(defaultProps.labelText)
        ).toBeInTheDocument();
    });

    test.each(["description", "description1"] as const)(
        "checks if optionValues is rendered",
        (option) => {
            expect(
                screen.getByRole("option", { name: option })
            ).toBeInTheDocument();
        }
    );

    test("checks if correct value is rendered", () => {
        expect(screen.getByLabelText(defaultProps.labelText)).toHaveValue("");
    });

    test("checks if onChange event works", async () => {
        const selectElement = screen.getByLabelText(defaultProps.labelText);
        await userEvent.selectOptions(selectElement, duplicatedOption);
        expect(handleChange).toHaveBeenCalledWith(duplicatedOption);
    });

    test("checks if default option exists", () => {
        expect(
            screen.getByRole("option", { name: "Choose your option" })
        ).toBeDisabled();
    });

    test("checks if only unique options are rendered", () => {
        expect(
            screen.getAllByRole("option", { name: duplicatedOption }).length
        ).toBe(1);
    });
});
