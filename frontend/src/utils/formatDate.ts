export function useFormatDate(dateToFormat: string) {
    const [year, month, day] = dateToFormat.split("-");
    const formattedDate = [month, day, year].join("/");
    return formattedDate;
}