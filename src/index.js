import galleryItems from './app';

const galleryList = document.querySelector('.js-gallery');

const modalLightbox = document.querySelector('.js-lightbox');

const modalImage = document.querySelector('.lightbox__image');

const modalCloseBtn = document.querySelector('.lightbox__button');

const overlay = document.querySelector('.lightbox__overlay');

import createGallaryMarkup from './createMarkup';

const galleryMarkup = createGallaryMarkup(galleryItems);

galleryList.insertAdjacentHTML('afterbegin', galleryMarkup);

galleryList.addEventListener('click', onGalleryElemClickOpenModal);

function onGalleryElemClickOpenModal(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  const bigImageLink = evt.target.dataset.source;

  modalLightbox.classList.add('is-open');
  window.addEventListener('keydown', onEscKeyPressCloseModal);

  modalImage.src = bigImageLink;
  modalImage.alt = evt.target.alt;
}

modalCloseBtn.addEventListener('click', onModalClose);

function onModalClose(evt) {
  modalLightbox.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';
  window.removeEventListener('keydown', onEscKeyPressCloseModal);
}

overlay.addEventListener('click', onOverlayClickClose);

function onOverlayClickClose(evt) {
  // if (evt.currentTarget === evt.target) {
  //   onModalClose();
  // }
  if (evt.target.classList.contains('lightbox__overlay')) {
    onModalClose();
  }
}

function onEscKeyPressCloseModal(evt) {
  const esc_key_code = 'Escape';
  if (evt.code === esc_key_code) {
    onModalClose();
  }
}

window.addEventListener('keyup', toRightArrow);
window.addEventListener('keyup', toLeftArrow);

function toRightArrow(key) {
  if (key.code !== 'ArrowRight') {
    return;
  }

  let currentImageIndex = findCurrentImageIndex();

  if (currentImageIndex < galleryItems.length - 1) {
    currentImageIndex += 1;
  } else {
    currentImageIndex = 0;
  }
  modalImage.src = galleryItems[currentImageIndex].original;
  modalImage.alt = galleryItems[currentImageIndex].description;
}

function toLeftArrow(key) {
  if (key.code !== 'ArrowLeft') {
    return;
  }

  let currentImageIndex = findCurrentImageIndex();

  if (currentImageIndex > 0) {
    currentImageIndex -= 1;
  } else {
    currentImageIndex = galleryItems.length - 1;
  }
  modalImage.src = galleryItems[currentImageIndex].original;
  modalImage.alt = galleryItems[currentImageIndex].description;
}

function findCurrentImageIndex() {
  const currentImage = galleryItems.find(item => item.description === modalImage.alt);

  let currentIndex = galleryItems.indexOf(currentImage);

  return currentIndex;
}
