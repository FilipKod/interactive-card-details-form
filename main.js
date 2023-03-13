"use strict";
// Buttons
const formButton = document.getElementById("confirmButton");
// Inputs
const cardHolderInput = document.getElementById("cardHolder");
const cardNumberInput = document.getElementById("cardNumber");
const cardExpireMonthInput = document.getElementById("cardExpMonth");
const cardExpireYearInput = document.getElementById("cardExpYear");
const cardCvcInput = document.getElementById("cardCVC");
// Preview Elements
const cardHolderPreview = document.getElementById("cardHolderPreview");
const cardNumberPreview = document.getElementById("cardNumberPreview");
const cardExpireMonthPreview = document.getElementById("expireMonthPreview");
const cardExpireYearPreview = document.getElementById("expireYearPreview");
const cardCvcPreview = document.getElementById("cardCVCPreview");
// Set initial preview values based on the html
const initHolderPreview = cardHolderPreview && cardHolderPreview.innerText;
const initNumberPreview = cardNumberPreview && cardNumberPreview.innerText;
const initExpireMonthPreview = cardExpireMonthPreview && cardExpireMonthPreview.innerText;
const initExpireYearPreview = cardExpireYearPreview && cardExpireYearPreview.innerText;
const initCvcPreview = cardCvcPreview && cardCvcPreview.innerText;
// Start with empty input values
// if (cardHolderInput) cardHolderInput.value = "";
// if (cardNumberInput) cardNumberInput.value = "";
// if (cardExpireMonthInput) cardExpireMonthInput.value = "";
// if (cardExpireYearInput) cardExpireYearInput.value = "";
// if (cardCvcInput) cardCvcInput.value = "";
cardHolderInput === null || cardHolderInput === void 0 ? void 0 : cardHolderInput.addEventListener("input", function (event) {
    const target = event.target;
    if (target) {
        target.value = target.value.replace(/\s+/g, " ");
    }
    setPreview(event, cardHolderPreview, initHolderPreview);
});
cardNumberInput === null || cardNumberInput === void 0 ? void 0 : cardNumberInput.addEventListener("input", function (event) {
    const target = event.target;
    if (target) {
        target.value = target.value
            .replace(/[^\d]/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim();
    }
    setPreview(event, cardNumberPreview, initNumberPreview);
});
cardExpireMonthInput === null || cardExpireMonthInput === void 0 ? void 0 : cardExpireMonthInput.addEventListener("input", function (event) {
    const target = event.target;
    if (target) {
        target.value = target.value.replace(/[^\d]/g, "");
        if (+target.value > 12) {
            target.value = "12";
        }
    }
    setPreview(event, cardExpireMonthPreview, initExpireMonthPreview);
});
cardExpireYearInput === null || cardExpireYearInput === void 0 ? void 0 : cardExpireYearInput.addEventListener("input", function (event) {
    const target = event.target;
    if (target) {
        target.value = target.value.replace(/[^\d]/g, "");
    }
    setPreview(event, cardExpireYearPreview, initExpireYearPreview);
});
cardCvcInput === null || cardCvcInput === void 0 ? void 0 : cardCvcInput.addEventListener("input", function (event) {
    const target = event.target;
    if (target) {
        target.value = target.value.replace(/[^\d]/g, "");
    }
    setPreview(event, cardCvcPreview, initCvcPreview);
});
// formButton?.addEventListener("submit", formSubmit);
formButton === null || formButton === void 0 ? void 0 : formButton.addEventListener("click", formSubmit);
const emptyErrorMessage = "Can't be blank";
const wrongFormatErrorMessage = "Wrong format, number only";
function formSubmit(event) {
    event.preventDefault();
    // validateCardHolder();
    validateCardNumber();
    // validateExpireDate();
}
function validateCardHolder() {
    if (cardHolderInput) {
        if (!cardHolderInput.value.length) {
            setErrorMessage(cardHolderInput, emptyErrorMessage);
        }
        else if (new RegExp(/[^a-z A-Z]/g).test(cardHolderInput.value)) {
            setErrorMessage(cardHolderInput, "Wrong format, alphabetical and space only");
        }
        else {
            removeErrorMessage(cardHolderInput);
        }
    }
}
function validateCardNumber() {
    if (cardNumberInput) {
        if (!cardNumberInput.value.length) {
            setErrorMessage(cardNumberInput, emptyErrorMessage);
        }
        else if (new RegExp(/[^0-9]/).test(cardNumberInput.value.replace(/ /g, ""))) {
            setErrorMessage(cardNumberInput, wrongFormatErrorMessage);
        }
        else {
            removeErrorMessage(cardNumberInput);
        }
    }
}
function validateExpireDate() {
    if (cardExpireMonthInput && cardExpireYearInput) {
        if (!cardExpireMonthInput.value.length) {
            setErrorMessage(cardExpireMonthInput, emptyErrorMessage);
        }
        else {
            removeErrorMessage(cardExpireMonthInput);
        }
        if (!cardExpireYearInput.value.length) {
            setErrorMessage(cardExpireYearInput, emptyErrorMessage);
        }
        else {
            removeErrorMessage(cardExpireYearInput);
        }
    }
}
function setErrorMessage(inputElement, text) {
    if (inputElement.parentNode) {
        console.log(inputElement);
        removeErrorParagraph(inputElement);
        const errorElement = document.createElement("p");
        errorElement.classList.add("error-message");
        errorElement.innerText = text;
        inputElement.parentNode.appendChild(errorElement);
        inputElement.classList.add("error");
    }
}
function removeErrorMessage(inputElement) {
    console.log("dsa");
    if (inputElement.parentNode) {
        inputElement.removeAttribute("class");
        removeErrorParagraph(inputElement);
    }
}
function removeErrorParagraph(inputElement) {
    var _a;
    (_a = inputElement.parentNode) === null || _a === void 0 ? void 0 : _a.querySelectorAll("p.error-message").forEach((errorParagraph) => {
        errorParagraph.remove();
    });
}
function setPreview(event, previewElement, defaultValue) {
    const target = event.target;
    if (previewElement && defaultValue && target) {
        previewElement.innerText = target.value || defaultValue;
    }
}
