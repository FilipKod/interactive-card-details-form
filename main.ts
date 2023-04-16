// Form and complete section
const cardForm = document.getElementById("cardForm") as HTMLFormElement | null;
const cardComplete = document.getElementById(
  "cardComplete"
) as HTMLDivElement | null;

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
if (cardForm) cardForm.reset();

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

cardExpireMonthInput?.addEventListener("change", function (event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    target.value = target.value.replace(/^([1-9]{1})$/g, "0$1");
  }
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

const emptyErrorMessage = "Can't be blank";
const wrongFormatErrorMessage = "Wrong format, number only";

function formSubmit(event: Event) {
  event.preventDefault();

  removeAllErrorMessages();

  const isHolderValid = validateCardHolder();
  const isNumberValid = validateCardNumber();
  const isMonthValid = validateExpireDateMonth();
  const isYearValid = validateExpireDateYear();
  const isCvcValid = validateCvc();

  const isFormValid: boolean =
    isHolderValid && isNumberValid && isMonthValid && isYearValid && isCvcValid;

  if (isFormValid) showCompleteSection();
}

function validateCardHolder(): boolean {
  if (cardHolderInput) {
    if (!cardHolderInput.value.length) {
      return setErrorMessage(cardHolderInput, emptyErrorMessage);
    } else if (new RegExp(/[^a-z A-Z]/g).test(cardHolderInput.value)) {
      return setErrorMessage(
        cardHolderInput,
        "Wrong format, alphabetical and space only"
      );
    } else if (cardHolderInput.value.length < 3) {
      return setErrorMessage(
        cardHolderInput,
        "Cardholder name should be least 3 characters"
      );
    }
    return true;
  }
  return false;
}

function validateCardNumber(): boolean {
  if (cardNumberInput) {
    if (!cardNumberInput.value.length) {
      return setErrorMessage(cardNumberInput, emptyErrorMessage);
    } else if (
      !new RegExp(/^[0-9]{16}$/).test(cardNumberInput.value.replace(/ /g, ""))
    ) {
      return setErrorMessage(cardNumberInput, wrongFormatErrorMessage);
    }
    return true;
  }
  return false;
}

function validateExpireDateMonth(): boolean {
  if (cardExpireMonthInput) {
    if (!cardExpireMonthInput.value.length) {
      return setErrorMessage(cardExpireMonthInput, emptyErrorMessage);
    } else if (!new RegExp(/[0-9]{2}/g).test(cardExpireMonthInput.value)) {
      return setErrorMessage(
        cardExpireMonthInput,
        "Expiration month is incomplete."
      );
    } else if (+cardExpireMonthInput.value < 1) {
      return setErrorMessage(
        cardExpireMonthInput,
        "Expiration month must be between 1 and 12."
      );
    }
    return true;
  }
  return false;
}

function validateExpireDateYear(): boolean {
  if (cardExpireYearInput) {
    const actualYear = new Date().getFullYear().toString().slice(-2);
    if (!cardExpireYearInput.value.length) {
      return setErrorMessage(cardExpireYearInput, emptyErrorMessage);
    } else if (!new RegExp(/[0-9]{2}/g).test(cardExpireYearInput.value)) {
      return setErrorMessage(
        cardExpireYearInput,
        "Expiration year is incomplete."
      );
    } else if (+cardExpireYearInput.value < +actualYear) {
      return setErrorMessage(
        cardExpireYearInput,
        "Expiration year is in the past."
      );
    }
    return true;
  }
  return false;
}

function validateCvc(): boolean {
  if (cardCvcInput) {
    if (!cardCvcInput.value.length) {
      return setErrorMessage(cardCvcInput, emptyErrorMessage);
    } else if (!new RegExp(/^[0-9]{3}$/g).test(cardCvcInput.value)) {
      return setErrorMessage(cardCvcInput, "Wrong format, 3 numbers required");
    }
    return true;
  }
  return false;
}

function setErrorMessage(
  inputElement: HTMLInputElement,
  text: string
): boolean {
  if (inputElement.parentNode) {
    const errorElement = document.createElement("p");
    errorElement.classList.add("error-message");
    errorElement.innerText = text;

    inputElement.parentNode.appendChild(errorElement);
    inputElement.classList.add("error");
  }
  return false;
}

function removeAllErrorMessages() {
  document.querySelectorAll("p.error-message").forEach((errorMessage) => {
    errorMessage.remove();
  });

  document.querySelectorAll("input.error").forEach((errorInput) => {
    errorInput.classList.remove("error");
  });
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

function showCompleteSection() {
  if (cardComplete && cardForm) {
    cardForm.classList.add("hide");
    cardComplete.classList.remove("hide");
    cardComplete.classList.add("show");
  }
}
