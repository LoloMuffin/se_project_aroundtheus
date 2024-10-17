import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

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
const cardForm = document.forms["card-form"];
const profileEdit = document.querySelector("#profile-edit");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardAdd = document.querySelector("#card-add");
const cardTemplate = document.querySelector("#card-template");

const formValidators = {};

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".location__cards"
);

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      description: formData.description,
    });
  }
);

const cardAddPopup = new PopupWithForm("#card-add-modal", (formData) => {
  const cardData = { name: formData.location, link: formData.url };
  const newCardElement = createCard(cardData);
  cardSection.addItem(newCardElement);
});

const fullImagePopup = new PopupWithImage("#full-image-modal");

function createCard(data) {
  const card = new Card(data, openFullImage, cardTemplate);
  return card.getElement();
}

function openFullImage(imageSrc, title) {
  fullImagePopup.open({ name: title, link: imageSrc });
}

profileEdit.addEventListener("click", () => {
  const formName = profileForm.getAttribute("name");
  if (formValidators[formName]) {
    formValidators[formName].resetValidation();
  }
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  profileEditPopup.open();
});

cardAdd.addEventListener("click", () => {
  const formName = cardForm.getAttribute("name");
  if (formValidators[formName]) {
    formValidators[formName].resetValidation();
  }
  cardAddPopup.open();
});

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formName = formElement.getAttribute("name");
    const validator = new FormValidator(config, formElement);
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

profileEditPopup.setEventListeners();
cardAddPopup.setEventListeners();
fullImagePopup.setEventListeners();

enableValidation(config);

cardSection.renderItems();
