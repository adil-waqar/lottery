export const toDate = (date: string): Date => {
  const dateSplit: string[] = date.split('-');
  return new Date(
    parseInt(dateSplit[2]),
    parseInt(dateSplit[1]) - 1,
    parseInt(dateSplit[0])
  );
};
