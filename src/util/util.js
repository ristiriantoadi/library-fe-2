import { privateAxios } from "UtilRequests/util-axios";

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export const addDate = (date, days) => {
  return new Date(date.getTime() + ONE_DAY_IN_MILLISECONDS * days);
};

export const dateDifference = (date1, date2) => {
  return (date1.getTime() - date2.getTime()) / ONE_DAY_IN_MILLISECONDS;
};

export const getDate = (date) => {
  var d = date,
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
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

export const validateISBN = (isbn) => {
  // Remove any hyphens or spaces from the ISBN
  isbn = isbn.replace(/[-\s]/g, "");

  // Validate ISBN-10 (with 'X' as the check digit)
  const isbn10Pattern = /^(?:\d{9}X|\d{10})$/;

  // Validate ISBN-13
  const isbn13Pattern = /^(?:\d{13})$/;

  return isbn10Pattern.test(isbn) || isbn13Pattern.test(isbn);
};

export const fetchMember = async () => {
  try {
    response = await privateAxios.get("/admin/member");
    console.log("response", response);
    return response.data.content;
  } catch (error) {
    return [];
  }
};
