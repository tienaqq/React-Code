export const formatNumberToString = (num, minChars) => {
  return num.toString().length < minChars
    ? formatNumberToString(`0${num}`, minChars)
    : num.toString();
};
