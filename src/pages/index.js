import {
  initialCards,
  config,
  profileForm,
  cardForm,
  profileEdit,
  cardAdd,
  cardTemplate,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

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
  cardForm.reset();
  cardAddPopup.close();
  // const formName = cardForm.getAttribute("name");
  // if (formValidators[formName]) {
  //   formValidators[formName].toggleSubmitButtonState();
  // }
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
  profileEditPopup.setInputValues(currentUserInfo);
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
