class Card {
  constructor(data, locationCards, openFullImage) {
    this.data = data;
    this.locationCards = locationCards;
    this.openFullImage = openFullImage;
    this.cardElement = this._getCardElement();
  }

  _getCardElement() {
    const cardTemplate = document
      .querySelector("#card-template")
      .content.querySelector(".card");
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardText = cardElement.querySelector(".card__text");
    const cardLike = cardElement.querySelector(".card__like");
    const cardDelete = cardElement.querySelector(".card__delete");
    cardImage.src = this.data.link;
    cardImage.alt = this.data.name;
    cardText.textContent = this.data.name;
    cardDelete.addEventListener("click", () => {
      this._deleteCard();
    });
    cardLike.addEventListener("click", this._toggleLikeButton);
    cardImage.addEventListener("click", () => {
      this.openFullImage(this.data.link, this.data.name);
    });
    return cardElement;
  }

  _deleteCard() {
    this.cardElement.remove();
  }

  _toggleLikeButton(e) {
    e.target.classList.toggle("card__like_active");
  }

  render() {
    this.locationCards.prepend(this.cardElement);
  }
}

export default Card;
