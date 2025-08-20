import { CardFormWidget } from "../widget";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM(`...`).window;

test("widget should render", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new CardFormWidget(container);
  widget.bindToDOM();
  expect(container.innerHTML).toEqual(CardFormWidget.markup);
});

test("Check Valid Visa Card", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new CardFormWidget(container);
  widget.bindToDOM();
  widget.input.value = "4532015112830366";
  widget.submit.click();
  expect(widget.input.classList.contains("valid")).toEqual(true);
});

test("Check Valid Discover Card", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new CardFormWidget(container);
  widget.bindToDOM();
  widget.input.value = "6011111111111117";
  widget.submit.click();
  expect(widget.input.classList.contains("valid")).toEqual(true);
});

test("Check Valid American Express Card", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new CardFormWidget(container);
  widget.bindToDOM();
  widget.input.value = "378282246310005";
  widget.submit.click();
  expect(widget.input.classList.contains("valid")).toEqual(true);
});

test("Check Valid MasterCard", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new CardFormWidget(container);
  widget.bindToDOM();
  widget.input.value = "5555555555554444";
  widget.submit.click();
  expect(widget.input.classList.contains("valid")).toEqual(true);
});

test("Check invalid card", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new CardFormWidget(container);
  widget.bindToDOM();
  widget.input.value = "1234567890123456";
  widget.submit.click();
  expect(widget.input.classList.contains("invalid")).toEqual(true);
});

test("Check invalid card less 4 numbers", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new CardFormWidget(container);
  widget.bindToDOM();
  widget.input.value = "123";
  widget.submit.click();
  expect(widget.input.classList.contains("invalid")).toEqual(true);
});

test("Check invalid card more 20 numbers", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new CardFormWidget(container);
  widget.bindToDOM();
  widget.input.value = "33333333333333333333";
  widget.submit.click();
  expect(widget.input.classList.contains("invalid")).toEqual(true);
});

test("Check invalid card if not numbers", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new CardFormWidget(container);
  widget.bindToDOM();
  widget.input.value = "aaaafdf";
  widget.submit.click();
  expect(widget.input.classList.contains("invalid")).toEqual(true);
});
