const validatePassword = (password) => {
  const lengthRegex =
    /[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]{8}[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]*/;
  const lengthTest = lengthRegex.test(password); // true/false

  const upperRegex = /[A-Z]/;
  const upperTest = upperRegex.test(password);

  const lowerRegex = /[a-z]/;
  const lowerTest = lowerRegex.test(password);

  const numbersRegex = /\d/;
  const numbersTest = numbersRegex.test(password);

  const specialRegex = /[!#$%&'*+\/=?^_`{|}~-]/;
  const specialTest = specialRegex.test(password);

  return lengthTest && upperTest && lowerTest && numbersTest && specialTest;
};
export default validatePassword;
