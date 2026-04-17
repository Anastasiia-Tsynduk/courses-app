import formatCreationDate from "@/helpers/formatCreationDate";

test.each([
    ["20/05/2025", "20.05.2025"],
    ["2025/05/20", "20.05.2025"],
    ["1/2/2025", "01.02.2025"],
    ["01/02/2025", "01.02.2025"],
    ["23/11/2025", "23.11.2025"],
])(
    "checks conversion of differen type of data to DD.MM.YYYY",
    (data, result) => {
        expect(formatCreationDate(data)).toBe(result);
    }
);
