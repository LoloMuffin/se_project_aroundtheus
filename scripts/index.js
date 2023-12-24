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
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const fullImageModal = document.querySelector("#full-image-modal");
const modalImage = document.querySelector(".modal__image");
const modalTitle = document.querySelector(".modal__image-text");

const closeButtons = document.querySelectorAll(".modal__close");

function openModal(modalElement) {
  modalElement.classList.add("modal_opened");
}

function closeModal(modalElement) {
  modalElement.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDelete = cardElement.querySelector(".card__delete");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardText.textContent = data.name;
  cardDelete.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  cardLike.addEventListener("click", toggleLikeButton);
  cardImage.addEventListener("click", () => {
    openFullImage(data.link, data.name);
  });
  return { cardElement, cardLike };
}

function renderCard(cardData) {
  const { cardElement } = getCardElement(cardData, locationCards);
  locationCards.prepend(cardElement);
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleLikeButton(e) {
  e.target.classList.toggle("card__like_active");
}

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
  const actions = newName &&
    newDescription && [
      () => {
        profileName.textContent = newName;
        profileDescription.textContent = newDescription;
        closeModal(profileEditModal);
      },
    ];
  actions && actions.forEach((action) => action());
}

function submitCardAdd(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const actions = name &&
    link && [
      () => renderCard({ name, link }),
      () => closeModal(cardAddModal),
      () => e.target.reset(),
    ];
  actions && actions.forEach((action) => action());
}

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileEdit.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileForm.addEventListener("submit", submitProfileEdit);

cardAdd.addEventListener("click", () => openModal(cardAddModal));
cardForm.addEventListener("submit", submitCardAdd);

initialCards.reverse().forEach((cardData) => renderCard(cardData));
