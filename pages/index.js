import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible",
};

const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formName = formElement.getAttribute("name");
    const validator = new FormValidator(config, formElement);
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

function createCard(cardData) {
  return new Card(cardData, openFullImage);
}

function openFullImage(imageSrc, title) {
  const modalImage = document.querySelector(".modal__image");
  const modalTitle = document.querySelector(".modal__image-text");
  const fullImageModal = document.querySelector("#full-image-modal");
  modalImage.src = imageSrc;
  modalImage.alt = title;
  modalTitle.textContent = title;
  openModal(fullImageModal);
}

function submitProfileEdit(e) {
  e.preventDefault();
  const newName = document.querySelector("#profile-name-input").value.trim();
  const newDescription = document
    .querySelector("#profile-description-input")
    .value.trim();
  document.querySelector(".profile__name").textContent = newName;
  document.querySelector(".profile__description").textContent = newDescription;
  closeModal(document.querySelector("#profile-edit-modal"));
}

function submitCardAdd(e) {
  e.preventDefault();
  const name = document.querySelector("#card-title-input").value;
  const link = document.querySelector("#card-url-input").value;
  const card = createCard({ name, link });
  document.querySelector(".location__cards").prepend(card.getElement());
  closeModal(document.querySelector("#card-add-modal"));
  e.target.reset();
}

function openModal(modalElement) {
  modalElement.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalByEsc);
  modalElement.classList.add("modal_opened");
}

function closeModal(modalElement) {
  modalElement.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalByEsc);
  modalElement.classList.remove("modal_opened");
}

function closeModalByEsc(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeModalOnRemoteClick(e) {
  if (
    e.target === e.currentTarget ||
    e.target.classList.contains("modal__close")
  ) {
    closeModal(e.currentTarget);
  }
}

document.querySelector("#profile-edit").addEventListener("click", () => {
  const profileEditModal = document.querySelector("#profile-edit-modal");
  const formElement = profileEditModal.querySelector("form");
  const formName = formElement?.getAttribute("name");
  if (!formName) {
    console.error("Form name not found for profile edit.");
    return;
  }
  const validator = formValidators[formName];
  if (!validator) {
    console.error(`Validator for form '${formName}' not found.`);
    return;
  }
  validator.resetValidation();
  const profileNameInput = document.querySelector("#profile-name-input");
  const profileDescriptionInput = document.querySelector(
    "#profile-description-input"
  );
  const currentName = document
    .querySelector(".profile__name")
    .textContent.trim();
  const currentDescription = document
    .querySelector(".profile__description")
    .textContent.trim();
  profileNameInput.value = currentName;
  profileDescriptionInput.value = currentDescription;
  openModal(profileEditModal);
});

document.forms["profile-form"].addEventListener("submit", submitProfileEdit);

document.querySelector("#card-add").addEventListener("click", () => {
  const cardAddModal = document.querySelector("#card-add-modal");
  const formElement = cardAddModal.querySelector("form");
  const formName = formElement?.getAttribute("name");
  if (!formName) {
    console.error("Form name not found for card add.");
    return;
  }
  const validator = formValidators[formName];
  if (!validator) {
    console.error(`Validator for form '${formName}' not found.`);
    return;
  }
  validator.resetValidation();
  openModal(cardAddModal);
});

document.forms["card-form"].addEventListener("submit", submitCardAdd);

enableValidation(config);

initialCards.reverse().forEach((cardData) => {
  const card = createCard(cardData);
  document.querySelector(".location__cards").prepend(card.getElement());
});
