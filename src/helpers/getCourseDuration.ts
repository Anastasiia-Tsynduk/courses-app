const getCourseDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const formatted = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;

    return hours === 1 ? `${formatted} hour` : `${formatted} hours`;
};

export default getCourseDuration;
