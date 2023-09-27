const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
export const addDate = (date, days) => {
  return new Date(date.getTime() + ONE_DAY_IN_MILLISECONDS * days);
};

export const getInitials = (inputString) => {
  const words = inputString.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join("");
};
