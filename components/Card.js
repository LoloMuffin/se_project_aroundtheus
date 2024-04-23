// class Card {
//   constructor(data, locationCards, openFullImage) {
//     this.data = data;
//     this.locationCards = locationCards;
//     this.openFullImage = openFullImage;
//     this.cardElement = this._getCardElement();
//   }

//   _getCardElement() {
//     const cardTemplate = document
//       .querySelector("#card-template")
//       .content.querySelector(".card");
//     const cardElement = cardTemplate.cloneNode(true);
//     const cardImage = cardElement.querySelector(".card__image");
//     const cardText = cardElement.querySelector(".card__text");
//     const cardLike = cardElement.querySelector(".card__like");
//     const cardDelete = cardElement.querySelector(".card__delete");
//     cardImage.src = this.data.link;
//     cardImage.alt = this.data.name;
//     cardText.textContent = this.data.name;
//     cardDelete.addEventListener("click", () => {
//       this._deleteCard();
//     });
//     cardLike.addEventListener("click", this._toggleLikeButton);
//     cardImage.addEventListener("click", () => {
//       this.openFullImage(this.data.link, this.data.name);
//     });
//     return cardElement;
//   }

//   _deleteCard() {
//     this.cardElement.remove();
//   }

//   _toggleLikeButton(e) {
//     e.target.classList.toggle("card__like_active");
//   }

//   render() {
//     this.locationCards.prepend(this.cardElement);
//   }
// }

// export default Card;

class Card {
  constructor(data, openFullImage) {
    this.data = data;
    this.openFullImage = openFullImage;
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
    const cardTemplate = document
      .querySelector("#card-template")
      .content.querySelector(".card");
    return cardTemplate.cloneNode(true);
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
