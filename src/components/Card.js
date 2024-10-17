class Card {
  constructor(data, openFullImage, cardTemplate) {
    this.data = data;
    this.openFullImage = openFullImage;
    this.cardTemplate = cardTemplate.content.querySelector(".card");
    this.cardElement = this._getCardElement();
    this.cardImage = this.cardElement.querySelector(".card__image");
    this.cardText = this.cardElement.querySelector(".card__text");
    this.cardLike = this.cardElement.querySelector(".card__like");
    this.cardDelete = this.cardElement.querySelector(".card__delete");
    this.cardImage.src = this.data.link;
    this.cardImage.alt = this.data.name;
    this.cardText.textContent = this.data.name;
    this._setEventListeners();
  }

  _getCardElement() {
    return this.cardTemplate.cloneNode(true);
  }

  _setEventListeners() {
    this.cardDelete.addEventListener("click", () => this._deleteCard());
    this.cardLike.addEventListener("click", this._toggleLikeButton);
    this.cardImage.addEventListener("click", () =>
      this.openFullImage(this.data.link, this.data.name)
    );
  }

  _toggleLikeButton(e) {
    e.target.classList.toggle("card__like_active");
  }

  _deleteCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  getElement() {
    return this.cardElement;
  }
}

export default Card;
