const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
export const addDate = (date, days) => {
  return new Date(date.getTime() + ONE_DAY_IN_MILLISECONDS * days);
};

export const getInitials = (inputString) => {
  const words = inputString.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join("");
};

export const validatePhoneNumber = (phoneNumber) => {
  const pattern = /^(0|\+62)\d{11}$/;
  const res = pattern.test(phoneNumber);
  console.log("res", res);
  return pattern.test(phoneNumber);
};
