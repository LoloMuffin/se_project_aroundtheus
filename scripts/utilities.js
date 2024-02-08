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
    closeModal(fullImageModal);
  }
}