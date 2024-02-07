function closeModalOnRemoteClick(e) {
  if (
    e.target === e.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
  }
}
