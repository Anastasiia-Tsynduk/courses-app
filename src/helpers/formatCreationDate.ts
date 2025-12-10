const formatCreationDate = (date: string) => {
    if (date === "") {
        return "";
    }
    const [part1, part2, part3] = date.split(/\D+/);

    const [day, month, year] =
        part1.length === 4 ? [part3, part2, part1] : [part1, part2, part3];

    const dd = day.padStart(2, "0");
    const mm = month.padStart(2, "0");

    return `${dd}.${mm}.${year}`;
};

export default formatCreationDate;
