// Buttons
const formButton = document.getElementById(
  "confirmButton"
) as HTMLButtonElement | null;

// Inputs
const cardHolderInput = document.getElementById(
  "cardHolder"
) as HTMLInputElement | null;
const cardNumberInput = document.getElementById(
  "cardNumber"
) as HTMLInputElement;
const cardExpireMonthInput = document.getElementById(
  "cardExpMonth"
) as HTMLInputElement | null;
const cardExpireYearInput = document.getElementById(
  "cardExpYear"
) as HTMLInputElement | null;
const cardCvcInput = document.getElementById(
  "cardCVC"
) as HTMLInputElement | null;

// Preview Elements
const cardHolderPreview = document.getElementById("cardHolderPreview");
const cardNumberPreview = document.getElementById("cardNumberPreview");
const cardExpireMonthPreview = document.getElementById("expireMonthPreview");
const cardExpireYearPreview = document.getElementById("expireYearPreview");
const cardCvcPreview = document.getElementById("cardCVCPreview");

// Set initial preview values based on the html
const initHolderPreview = cardHolderPreview && cardHolderPreview.innerText;
const initNumberPreview = cardNumberPreview && cardNumberPreview.innerText;
const initExpireMonthPreview =
  cardExpireMonthPreview && cardExpireMonthPreview.innerText;
const initExpireYearPreview =
  cardExpireYearPreview && cardExpireYearPreview.innerText;
const initCvcPreview = cardCvcPreview && cardCvcPreview.innerText;

// Start with empty input values
if (cardHolderInput) cardHolderInput.value = "";
if (cardNumberInput) cardNumberInput.value = "";
if (cardExpireMonthInput) cardExpireMonthInput.value = "";
if (cardExpireYearInput) cardExpireYearInput.value = "";
if (cardCvcInput) cardCvcInput.value = "";

cardHolderInput?.addEventListener("input", function (event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    target.value = target.value.replace(/\s+/g, " ");
  }
  setPreview(event, cardHolderPreview, initHolderPreview);
});

cardNumberInput?.addEventListener("input", function (event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    target.value = target.value
      .replace(/[^\d]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }
  setPreview(event, cardNumberPreview, initNumberPreview);
});

cardExpireMonthInput?.addEventListener("input", function (event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    target.value = target.value.replace(/[^\d]/g, "");

    if (+target.value > 12) {
      target.value = "12";
    }
  }

  setPreview(event, cardExpireMonthPreview, initExpireMonthPreview);
});

cardExpireYearInput?.addEventListener("input", function (event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    target.value = target.value.replace(/[^\d]/g, "");
  }

  setPreview(event, cardExpireYearPreview, initExpireYearPreview);
});

cardCvcInput?.addEventListener("input", function (event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    target.value = target.value.replace(/[^\d]/g, "");
  }
  setPreview(event, cardCvcPreview, initCvcPreview);
});

// formButton?.addEventListener("submit", formSubmit);
formButton?.addEventListener("click", formSubmit);

function formSubmit(event: Event) {
  event.preventDefault();

  validateIfEmpty(cardHolderInput);
  validateIfEmpty(cardNumberInput);
  validateIfEmpty(cardExpireMonthInput);
  validateIfEmpty(cardExpireYearInput);
  validateIfEmpty(cardCvcInput);
}

function validateIfEmpty(inputElement: HTMLInputElement | null) {
  if (inputElement) {
    if (inputElement.value === "") {
      const errorBlock = document.createElement("p");
      const textError = document.createTextNode("Can’t be blank");

      errorBlock.classList.add("error-message");
      errorBlock.appendChild(textError);

      inputElement.classList.add("error");

      inputElement.parentNode?.appendChild(errorBlock);
    } else {
      inputElement.removeAttribute("class");
    }
  }
}

function setPreview(
  event: Event,
  previewElement: HTMLElement | null,
  defaultValue: string | null
) {
  const target = event.target as HTMLInputElement | null;
  if (previewElement && defaultValue && target) {
    previewElement.innerText = target.value || defaultValue;
  }
}
