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
const profileModalClose = document.querySelector("#profile-modal-close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardForm = document.forms["card-form"];
const cardAdd = document.querySelector("#card-add");
const cardAddModal = document.querySelector("#card-add-modal");
const cardModalClose = document.querySelector("#card-modal-close");
const cardTitleInput = cardForm.querySelector("#card-title-input");
const cardUrlInput = cardForm.querySelector("#card-url-input");
const locationCards = document.querySelector(".location__cards");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const fullImageModal = document.querySelector("#full-image-modal");
const imageModalClose = document.querySelector("#image-modal-close");
const modalImage = document.querySelector(".modal__image");
const modalTitle = document.querySelector(".modal__image-text");

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
  return { cardElement, cardLike };
}

function renderCard(cardData) {
  const { cardElement, cardLike } = getCardElement(cardData, locationCards);
  locationCards.prepend(cardElement);
  activateLikeButton(cardLike);
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function activateLikeButton() {
  const likeButtons = document.querySelectorAll(".card__like");
  likeButtons.forEach((likeButton) => {
    likeButton.removeEventListener("click", toggleLikeButton);
    likeButton.addEventListener("click", toggleLikeButton);
  });
}

function toggleLikeButton() {
  this.classList.toggle("card__like_active");
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
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function submitCardAdd(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, locationCards);
  closeModal(cardAddModal);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
}

profileEdit.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalClose.addEventListener("click", () => closeModal(profileEditModal));
profileForm.addEventListener("submit", submitProfileEdit);

cardAdd.addEventListener("click", () => openModal(cardAddModal));
cardModalClose.addEventListener("click", () => closeModal(cardAddModal));
cardForm.addEventListener("submit", submitCardAdd);

locationCards.addEventListener("click", (event) => {
  const cardImage = event.target.closest(".card__image");
  const cardElement = cardImage?.closest(".card");
  const cardTitle = cardElement?.querySelector(".card__text")?.textContent;
  const cardSrc = cardImage?.src;
  cardSrc && openFullImage(cardSrc, cardTitle);
});

imageModalClose.addEventListener("click", closeFullImageModal);

initialCards
  .reverse()
  .forEach((cardData) => renderCard(cardData, locationCards));

activateLikeButton();
