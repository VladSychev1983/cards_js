import { isValidCard, luhnCheck, validateFormat } from "../validators";
import { getCardCompany } from "../validators";

test("should be false if card length less then 10", () => {
  const result = isValidCard("");
  expect(result).toBe(false);
});

test("should be false if card length more then 10", () => {
  const result = isValidCard("fdfasdfsadadfasdfasdfasdfadfa");
  expect(result).toBe(false);
});

test("should be false if card length is 20", () => {
  const result = isValidCard("12345678901234567890");
  expect(result).toBe(false);
});

test("check luhn not a number", () => {
  const result = luhnCheck("adf");
  expect(result).toBe(false);
});

test("check luhn algorithm", () => {
  const result = luhnCheck("6011111111111117");
  expect(result).toBe(true);
});

test("check format card with space", () => {
  const result = validateFormat("6011111111111117 ");
  expect(result).toBe(true);
});

test("check valid visa card", () => {
  const result = getCardCompany("4532015112830366");
  const expected = "visa";
  expect(result).toBe(expected);
});

test("check valid discover card", () => {
  const result = getCardCompany("6011111111111117");
  const expected = "discover";
  expect(result).toBe(expected);
});

test("check Valid American Express", () => {
  const result = getCardCompany("378282246310005");
  const expected = "american-express";
  expect(result).toBe(expected);
});

test("check Valid Mastercard", () => {
  const result = getCardCompany("5555555555554444");
  const expected = "mastercard";
  expect(result).toBe(expected);
});

test("check Valid Mir", () => {
  const result = getCardCompany("2200000000000053");
  const expected = "mir";
  expect(result).toBe(expected);
});

test("check Invalid Card Number", () => {
  const result = getCardCompany("1234567890123456");
  expect(result).toBe(false);
});
