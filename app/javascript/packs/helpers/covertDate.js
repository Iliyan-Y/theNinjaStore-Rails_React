export const dateToString = (date) => {
  let convertedDate = new Date(date);
  return convertedDate.toDateString();
};

export const dateTimeString = (date) => {
  let dateObject = new Date(date);
  let dateTime =
    dateObject.getHours() +
    ':' +
    dateObject.getMinutes() +
    ', ' +
    dateObject.toDateString();
  return dateTime;
};
