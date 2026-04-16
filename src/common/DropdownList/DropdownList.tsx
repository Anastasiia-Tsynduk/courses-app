import getCourseDuration from "@/helpers/getCourseDuration";
import "./DropdownList.css";

type DropdownList = {
    labelText: string;
    optionValues: string[];
    value: string;
    onChange: (value: string) => void;
};

const DropdownList: React.FC<DropdownList> = ({
    labelText,
    optionValues,
    value,
    onChange,
}) => {
    const uniqueValues = new Set<string>(optionValues);
    const textToShow = function (initialValue: string) {
        return labelText == "Duration"
            ? getCourseDuration(Number.parseInt(initialValue))
            : initialValue;
    };
    const id = labelText.toLowerCase().replace(" ", "");
    return (
        <div className="dropdown-wrapper">
            <label htmlFor={id} className="label">
                {labelText}
            </label>
            <select
                id={id}
                className="dropdown"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="" disabled>
                    Choose your option
                </option>
                {Array.from(uniqueValues).map((optionValue) => {
                    return (
                        <option key={optionValue} value={optionValue}>
                            {textToShow(optionValue)}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
export default DropdownList;
