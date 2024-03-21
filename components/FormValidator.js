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
      this._setEventListeners(formElement);
    });
  }

  resetValidation(formElement) {
    formElement.reset();
    const { inputErrorClass, errorClass, inactiveButtonClass } = this.config;
    const inputElements = [
      ...formElement.querySelectorAll(this.config.inputSelector),
    ];
    inputElements.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement, {
        inputErrorClass,
        errorClass,
      });
    });
    const submitButton = formElement.querySelector(
      this.config.submitButtonSelector
    );
    this._disableSubmitButton(submitButton, inactiveButtonClass);
  }

  _disableSubmitButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }

  _setEventListeners(formElement) {
    const { inputSelector, submitButtonSelector } = this.config;
    const inputElements = [...formElement.querySelectorAll(inputSelector)];
    const submitButton = formElement.querySelector(submitButtonSelector);
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._switchSubmitButtonState(inputElements, submitButton);
      });
    });
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement) {
    const { inputErrorClass, errorClass } = this.config;
    const errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const { inputErrorClass, errorClass } = this.config;
    const errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(errorClass);
  }

  _switchSubmitButtonState(inputElements, submitButton) {
    const formValid = this._checkFormValidity(inputElements);
    if (!formValid) {
      this._disableSubmitButton(submitButton, this.config.inactiveButtonClass);
    } else {
      submitButton.classList.remove(this.config.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _checkFormValidity(inputElements) {
    return inputElements.every((input) => input.validity.valid);
  }
}

export default FormValidator;
