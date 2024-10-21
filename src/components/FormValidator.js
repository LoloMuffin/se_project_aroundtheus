class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this.form = formElement;
    this.inputElements = [
      ...formElement.querySelectorAll(config.inputSelector),
    ];
    this.submitButton = formElement.querySelector(config.submitButtonSelector);
  }

  // enableValidation() {
  //   this.form.addEventListener("submit", (e) => e.preventDefault());
  //   this._setEventListeners();
  // }

  enableValidation() {
    this.form.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
    this._toggleSubmitButtonState();
  }

  _setEventListeners() {
    this.inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleSubmitButtonState() {
    const formValid = this.inputElements.every((input) => input.validity.valid); // Check if all inputs are valid
    if (formValid) {
      this.submitButton.classList.remove(this.config.inactiveButtonClass);
      this.submitButton.disabled = false;
    } else {
      this.submitButton.classList.add(this.config.inactiveButtonClass);
      this.submitButton.disabled = true;
    }
  }

  resetValidation() {
    this.form.reset();
    this._toggleSubmitButtonState();
    this.inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _showInputError(inputElement) {
    const errorMessageElement = this.form.querySelector(
      `#${inputElement.id}-error`
    );
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this.config.errorClass);
    inputElement.classList.add(this.config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this.form.querySelector(
      `#${inputElement.id}-error`
    );
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this.config.errorClass);
    inputElement.classList.remove(this.config.inputErrorClass);
  }
}

export default FormValidator;
