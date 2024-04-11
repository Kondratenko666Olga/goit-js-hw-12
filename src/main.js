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


form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();
    loader.style.display = 'block';
    const query = input.value.trim();
   

    if (!query) {
        displayErrorMessage('Please enter a search query.');
        return;
    }

    try {
        clearGallery();
        const images = await fetchImages(query);
        if (images.length === 0) {
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

