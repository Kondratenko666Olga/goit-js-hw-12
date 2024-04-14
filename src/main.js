import { fetchImages } from './js/pixabay-api.js';
import { createGalleryItem, clearGallery } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search');
const input = form.querySelector('.inputSearch');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.loadBtn'); 
const loaderMain = document.querySelector('.loaderMain');

let query;
let page = 1;
let maxPage;


form.addEventListener('submit', handleFormSubmit);
loadBtn.addEventListener('click', clickLoadBtn);


async function handleFormSubmit(event) {
    event.preventDefault();
    hideLoadBtn();
    loader.style.display = 'block';
    query = input.value.trim();
   
    if (!query) {
        displayErrorMessage('Please enter a search query.');
        return;
    }
    showLoaderEl();
    try {
        clearGallery();
        const images = await fetchImages(query, page);
        maxPage = Math.ceil(images.totalHits / 15);
        if (images.length === 0) {
            hideLoaderEl();
            displayErrorMessage('Sorry, there are no images matching your search query. Please try again!');
            return;
        }
        displayImages(images);
    } catch (error) {
        console.error('Error searching images:', error);
        displayErrorMessage('Failed to fetch images. Please try again later.');
    }finally {
        loader.style.display = 'none';
        input.value ='';
        const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt' });
    }
    hideLoaderEl();
  checkBtnVisibleStatus();
  event.target.reset();
}

function displayImages(images) {
    const galleryItems = images.map(createGalleryItem);
    gallery.append(...galleryItems);
}

function displayErrorMessage(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
        timeout: 3000,
        closeOnClick: true,
    });
}

async function clickLoadBtn() {
    page += 1;
    showLoaderEl();
  
    try {
      const data = await fetchImages(query, page);
      displayImages(data);
    } catch (err) {
      showError(err);
    }
  
    hideLoaderEl();
    checkBtnVisibleStatus();

    const height = gallery.firstElementChild.getBoundingClientRect().height;
  
    scrollBy({
      behavior: 'smooth',
      top: height * 2,
    });
};

function showLoadBtn() {
    loadBtn.classList.remove('hidden');
  }
  
  function hideLoadBtn() {
    loadBtn.classList.add('hidden');
  }
  
  function showLoaderEl() {
    loaderMain.classList.remove('hidden');
  }
  
  function hideLoaderEl() {
    loaderMain.classList.add('hidden');
  }

  function showError(msg) {
    iziToast.error({
        title: 'Error',
        message: msg,
        position: 'topRight',
        timeout: 3000,
        closeOnClick: true,
    });
  }

  function checkBtnVisibleStatus() {
    if (page >= maxPage) {
      hideLoadBtn();
      showError("We're sorry, but you've reached the end of search results.");
    } else {
      showLoadBtn();
    }
  }