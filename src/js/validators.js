export function isValidCard(cardNumber) {
  if (!validateFormat(cardNumber)) {
    console.log("faild card!");
    return false;
  }
  const companyPay = getCardCompany(cardNumber);
  console.log("detected complany:" + companyPay);
  if (companyPay) {
    return companyPay;
  }
  return luhnCheck(cardNumber);
}

export function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\s/g, "").split("").map(Number);
  console.log(digits);
  if (!digits.every((digit) => !isNaN(digit))) {
    console.log("this is not number!");
    return false;
  }
  let sum = 0;
  let shouldDouble = true;
  for (let index = digits.length - 1; index >= 0; index--) {
    let digit = digits[index];

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  let result = sum % 10 == 0;
  console.log(result);
  return sum % 10 == 0;
}

export const validateFormat = (cardNumber) => {
  const sanitizedNumber = cardNumber.replace(/\D/g, "");
  const regex = /^[0-9]{13,19}$/;
  return regex.test(sanitizedNumber);
};

export const getCardCompany = (cardNumber) => {
  // Remove any non-digit characters from the card number
  const cleanedCardNumber = cardNumber.replace(/\D/g, "");

  if (cleanedCardNumber.startsWith("4")) {
    return "visa";
  } else if (cleanedCardNumber.startsWith("5")) {
    return "mastercard";
  } else if (
    cleanedCardNumber.startsWith("34") ||
    cleanedCardNumber.startsWith("37")
  ) {
    return "american-express";
  } else if (
    cleanedCardNumber.startsWith("6011") ||
    (parseInt(cleanedCardNumber.substring(0, 3)) >= 644 &&
      parseInt(cleanedCardNumber.substring(0, 3)) <= 649) ||
    cleanedCardNumber.startsWith("65")
  ) {
    return "discover";
  } else if (cleanedCardNumber.startsWith("2")) {
    return "mir";
  } else {
    return false;
  }
};
