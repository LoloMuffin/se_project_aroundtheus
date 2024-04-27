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

const profileForm = document.forms["profile-form"];
const profileEdit = document.querySelector("#profile-edit");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const cardForm = document.forms["card-form"];
const cardAdd = document.querySelector("#card-add");
const cardTitleInput = cardForm.querySelector("#card-title-input");
const cardUrlInput = cardForm.querySelector("#card-url-input");
const cardAddModal = document.querySelector("#card-add-modal");
const cardTemplate = document.querySelector("#card-template");

const locationCards = document.querySelector(".location__cards");
const modalImage = document.querySelector(".modal__image");
const modalTitle = document.querySelector(".modal__image-text");
const fullImageModal = document.querySelector("#full-image-modal");

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

function createCard(data) {
  const card = new Card(data, openFullImage, cardTemplate);
  return card.getElement();
}

function openFullImage(imageSrc, title) {
  modalImage.src = imageSrc;
  modalImage.alt = title;
  modalTitle.textContent = title;
  openModal(fullImageModal);
}

function openModal(modalElement) {
  document.addEventListener("keydown", closeModalByEsc);
  modalElement.classList.add("modal_opened");
  modalElement.addEventListener("mousedown", closeModalOnRemoteClick);
}

function closeModal(modalElement) {
  document.removeEventListener("keydown", closeModalByEsc);
  modalElement.removeEventListener("mousedown", closeModalOnRemoteClick);
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

function submitCardAdd(e) {
  e.preventDefault();
  const cardData = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
  const newCardElement = createCard(cardData);
  locationCards.prepend(newCardElement);
  cardForm.reset();
  closeModal(cardAddModal);
}

function submitProfileEdit(e) {
  e.preventDefault();
  const newName = profileNameInput.value.trim();
  const newDescription = profileDescriptionInput.value.trim();
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
  closeModal(profileEditModal);
}

profileEdit.addEventListener("click", () => {
  const formName = profileForm?.getAttribute("name");
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
  profileNameInput.value = profileName.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

profileForm.addEventListener("submit", submitProfileEdit);

cardAdd.addEventListener("click", () => {
  const formName = cardForm?.getAttribute("name");
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

cardForm.addEventListener("submit", submitCardAdd);

enableValidation(config);

initialCards.forEach((cardData) => {
  const newCardElement = createCard(cardData);
  locationCards.append(newCardElement);
});
