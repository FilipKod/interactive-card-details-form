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
if (cardHolderInput)
    cardHolderInput.value = "";
if (cardNumberInput)
    cardNumberInput.value = "";
if (cardExpireMonthInput)
    cardExpireMonthInput.value = "";
if (cardExpireYearInput)
    cardExpireYearInput.value = "";
if (cardCvcInput)
    cardCvcInput.value = "";
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
function formSubmit(event) {
    event.preventDefault();
    validateIfEmpty(cardHolderInput);
    validateIfEmpty(cardNumberInput);
    validateIfEmpty(cardExpireMonthInput);
    validateIfEmpty(cardExpireYearInput);
    validateIfEmpty(cardCvcInput);
}
function validateIfEmpty(inputElement) {
    var _a, _b, _c, _d;
    if (inputElement) {
        const errorM = errorMessage("Can’t be blank");
        if (inputElement.value === "") {
            inputElement.classList.add("error");
            if (((_a = inputElement.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector("p.error-message")) === null) {
                (_b = inputElement.parentNode) === null || _b === void 0 ? void 0 : _b.appendChild(errorM);
            }
        }
        else {
            inputElement.removeAttribute("class");
            (_d = (_c = inputElement.parentNode) === null || _c === void 0 ? void 0 : _c.lastChild) === null || _d === void 0 ? void 0 : _d.remove();
        }
    }
}
function errorMessage(text) {
    const paragraphElement = document.createElement("p");
    paragraphElement.classList.add("error-message");
    paragraphElement.innerText = text;
    return paragraphElement;
}
function setPreview(event, previewElement, defaultValue) {
    const target = event.target;
    if (previewElement && defaultValue && target) {
        previewElement.innerText = target.value || defaultValue;
    }
}
