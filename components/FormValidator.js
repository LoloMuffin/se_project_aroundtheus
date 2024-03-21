class FormValidator {
  constructor(config) {
    this.config = config;
  }

  enableValidation() {
    const formElements = [
      ...document.querySelectorAll(this.config.formSelector),
    ];
    formElements.forEach((formElement) => {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this.setEventListeners(formElement);
    });
  }

  resetValidation(formElement) {
    formElement.reset();
    const { inputErrorClass, errorClass, inactiveButtonClass } = this.config;
    const inputElements = [
      ...formElement.querySelectorAll(this.config.inputSelector),
    ];
    inputElements.forEach((inputElement) => {
      this.hideInputError(formElement, inputElement, {
        inputErrorClass,
        errorClass,
      });
    });
    const submitButton = formElement.querySelector(
      this.config.submitButtonSelector
    );
    this.disableSubmitButton(submitButton, inactiveButtonClass);
  }

  disableSubmitButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }

  setEventListeners(formElement) {
    const { inputSelector, submitButtonSelector } = this.config;
    const inputElements = [...formElement.querySelectorAll(inputSelector)];
    const submitButton = formElement.querySelector(submitButtonSelector);
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(formElement, inputElement);
        this.switchSubmitButtonState(inputElements, submitButton);
      });
    });
  }

  checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(formElement, inputElement);
    } else {
      this.hideInputError(formElement, inputElement);
    }
  }

  showInputError(formElement, inputElement) {
    const { inputErrorClass, errorClass } = this.config;
    const errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
  }

  hideInputError(formElement, inputElement) {
    const { inputErrorClass, errorClass } = this.config;
    const errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(errorClass);
  }

  switchSubmitButtonState(inputElements, submitButton) {
    const formValid = this.checkFormValidity(inputElements);
    if (!formValid) {
      this.disableSubmitButton(submitButton, this.config.inactiveButtonClass);
    } else {
      submitButton.classList.remove(this.config.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  checkFormValidity(inputElements) {
    return inputElements.every((input) => input.validity.valid);
  }
}

export default FormValidator;
