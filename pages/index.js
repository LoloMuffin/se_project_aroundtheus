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
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardForm = document.forms["card-form"];
const cardAdd = document.querySelector("#card-add");
const cardAddModal = document.querySelector("#card-add-modal");
const cardTitleInput = cardForm.querySelector("#card-title-input");
const cardUrlInput = cardForm.querySelector("#card-url-input");
const locationCards = document.querySelector(".location__cards");

const fullImageModal = document.querySelector("#full-image-modal");
const modalImage = document.querySelector(".modal__image");
const modalTitle = document.querySelector(".modal__image-text");

const closeButtons = document.querySelectorAll(".modal__close");

const formValidator = new FormValidator(config);

function openFullImage(imageSrc, title) {
  modalImage.src = imageSrc;
  modalImage.alt = title;
  modalTitle.textContent = title;
  openModal(fullImageModal);
}

function closeFullImageModal() {
  closeModal(fullImageModal);
}

function submitProfileEdit(e) {
  e.preventDefault();
  const newName = profileNameInput.value.trim();
  const newDescription = profileDescriptionInput.value.trim();
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
  closeModal(profileEditModal);
}

function submitCardAdd(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const card = new Card({ name, link }, locationCards, openFullImage);
  card.render();
  closeModal(cardAddModal);
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
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => {
    closeModal(modal);
  });
});

profileEdit.addEventListener("click", () => {
  const formElement = profileEditModal.querySelector(".modal__form");
  if (formElement) {
    formValidator.resetValidation(formElement);
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  }
  openModal(profileEditModal);
});

profileForm.addEventListener("submit", submitProfileEdit);

profileEditModal
  .querySelector(".modal__close")
  .addEventListener("click", () => {
    closeModal(profileEditModal);
  });

cardAdd.addEventListener("click", () => {
  const formElement = cardAddModal.querySelector(".modal__form");
  formValidator.resetValidation(formElement);
  openModal(cardAddModal);
});

cardForm.addEventListener("submit", submitCardAdd);

cardAddModal.querySelector(".modal__close").addEventListener("click", () => {
  closeModal(cardAddModal);
});

initialCards.reverse().forEach((cardData) => {
  const card = new Card(cardData, locationCards, openFullImage);
  card.render();
});

formValidator.enableValidation();
