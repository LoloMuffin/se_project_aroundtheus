const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible",
};

const checkFormValidity = (inputElements) =>
  inputElements.every((input) => input.validity.valid);

const switchSubmitButtonState = (
  inputElements,
  submitButton,
  { inactiveButtonClass }
) => {
  const formValid = checkFormValidity(inputElements);
  if (!formValid) {
    disableSubmitButton(submitButton, inactiveButtonClass);
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
};

function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function setEventListeners(formElement, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options);
      switchSubmitButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

function resetValidation(formElement, options) {
  formElement.reset();
  const { inputErrorClass, errorClass, inactiveButtonClass } = options;
  const inputElements = [
    ...formElement.querySelectorAll(options.inputSelector),
  ];
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  });
  const submitButton = formElement.querySelector(options.submitButtonSelector);
  disableSubmitButton(submitButton, inactiveButtonClass);
}

function disableSubmitButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

enableValidation(config);
