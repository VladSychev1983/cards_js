import { isValidCard } from "./validators";

export class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
    <h3>Check your credit card number</h3>
    <ul class="cards list-unstyled">
    <li class="card mir"></li>
    <li class="card visa"></li>
    <li class="card mastercard"></li>
    <li class="card american-express"></li>
    <li class="card discover"></li>
    </ul>
        <form class="card-form-widget">
            <div class="control">
                <label for="card-input"></label>
                <input type="text" id="card-input" class="input" placeholder="Enter your card number">
            <button class="submit btn-success">Click to Validate</button>
            </div>
        </form>
        <p class="result"></p>
        `;
  }

  static get submitSelector() {
    return ".submit";
  }

  static get inputSelector() {
    return ".input";
  }

  static get selector() {
    return ".card-form-widget";
  }

  static get liSelector() {
    return ".card";
  }
  static get resultSelector() {
    return ".result";
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardFormWidget.markup;
    this.element = this.parentEl.querySelector(CardFormWidget.selector);
    this.submit = this.element.querySelector(CardFormWidget.submitSelector);
    this.input = this.element.querySelector(CardFormWidget.inputSelector);
    this.element.addEventListener("submit", this.onSubmit);
    this.cardList = this.parentEl.querySelectorAll(CardFormWidget.liSelector);
    this.result = this.parentEl.querySelector(CardFormWidget.resultSelector);
  }

  onSubmit(e) {
    e.preventDefault();
    const value = this.input.value;
    this.allDisableImg(value);
    if (isValidCard(value)) {
      this.enableImg(value);
      this.result.textContent = this.resultPrint(isValidCard(value));
      this.input.classList.add("valid");
      this.input.classList.remove("invalid");
    } else {
      this.result.textContent = this.resultPrint(isValidCard(value));
      this.input.classList.add("invalid");
      this.input.classList.remove("valid");
    }
  }

  enableImg(value) {
    let liArray = Array.from(this.cardList);
    liArray.forEach((card) => {
      if (!card.classList.contains(isValidCard(value))) {
        card.classList.add("disabled");
      } else {
        card.classList.add("enabled");
      }
    });
  }

  allDisableImg() {
    let liArray = Array.from(this.cardList);
    liArray.forEach((card) => {
      card.classList.remove("enabled");
      card.classList.add("disabled");
    });
  }

  resultPrint(companyPay) {
    let text = companyPay
      ? `Your card for ${companyPay}`
      : "Your card is incorrect!";
    return text;
  }
}
